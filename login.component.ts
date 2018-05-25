import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import  { StoredataService } from '../../../SERVICE/storedata.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, PatternValidator, FormControl, FormArray } from '@angular/forms';
import   { ValidationService  } from '../../../SERVICE/validation.service';
import { DatePipe } from '@angular/common';
 import { Router } from "@angular/router";  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [DatePipe]

})

export class LoginComponent implements OnInit {



   userlogin =
  {
    username : "",
    password : "",
   } 
 rForm: FormGroup;
 lForm : FormGroup;
 msg : any;
 pwd_regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/);
 name_regex = new RegExp(  "^[\\p{L} .'-]+$")
constructor( private storedataService : StoredataService , private http: HttpClient , private fb: FormBuilder  ,private router: Router,) {
   this.rForm = this.fb.group({
			'email':  [ '' ,Validators.required, Validators.email],
			'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(this.pwd_regex)]],
      'first_name' : ['', [Validators.required, Validators.pattern(this.name_regex)]],
      'last_name' : ['', [Validators.required, Validators.pattern(this.name_regex)]],
      'dob' : ['', Validators.required],
      'gender' : ['MA', Validators.required ],
      'tc' : [ '' ,  Validators.required ]
        
    	});
    
   }
  ngOnInit() {
    this.msg="";
    this.lForm = this.fb.group({
			'email': [null, [Validators.required, Validators.email]],
			'password': [null, [Validators.required ]]
      
    	});
      
      
  }

  get email() { return this.rForm.get('email'); }
	get password() { return this.rForm.get('password'); }
  get first_name() { return this.rForm.get('first_name'); }
  get last_name() {  return this.rForm.get('last_name');  }
  get dob() {  return this.rForm.get('dob');  }
  get gender() {  return this.rForm.get('gender');  }
  get tc() {  return this.rForm.get("tc");  }

registration(  ) : void {

this.storedataService.getvalue( this.rForm.value).subscribe((res)=>{
        console.log(res)
      })
} 
  
   

 login() : void 
 {
     this.storedataService.checkvalue( this.userlogin).subscribe((res)=>{
        console.log(res)
       
        if(res['error'] == true)
        {
            this.msg  =  res['data'].message ;
        }
        else
        {
        localStorage.setItem('currentUser', JSON.stringify({ token: res['data'].token, name: name }));
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser.token; // your token
        console.log(token);

        this.router.navigate(['/dashboard']);
        }

      })


     
    } 

     } 
      // console.log(this.abc) ; 


  




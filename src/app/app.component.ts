import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { fn, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveForms';
  userForm;
  todayDate: Date;
  maxDate: string;
  genderSelected: boolean= true;
  userList: Array<any>= [];
  requirementMessage: string= "";

  callForm(fb: FormBuilder){
    this.userForm= this.fb.group({
      'name': fb.control('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]),
      'dob': fb.control(this.maxDate, [Validators.required, Validators.max(+this.maxDate)]),
      'country': fb.control('IN'),
      'email': fb.control('', [Validators.required, Validators.email]),
      'gender': fb.control('', [Validators.required]),
      'fav_food': fb.control(''),
      'mobile': fb.control('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]),
      'marrital_status': fb.control('unmarried'),
      'address': fb.array([
        fb.group({
          'door_no': fb.control('', Validators.pattern('[0-9]*')),
          'street' : fb.control('',[Validators.required]),
          'zipcode' : fb.control('')
        }),
        fb.group({
          'door_no': fb.control('', Validators.pattern('[0-9]*')),
          'street' : fb.control('',[Validators.required]),
          'zipcode' : fb.control('')
        }),
        fb.group({
          'door_no': fb.control('', Validators.pattern('[0-9]*')),
          'street' : fb.control('',[Validators.required]),
          'zipcode' : fb.control('')
        })
      ])
    })
  }
  constructor(private fb: FormBuilder) {
    this.todayDate= new Date();
    this.maxDate= (this.todayDate.getFullYear()- 18)+"-"+String(this.todayDate.getMonth()).padStart(2, '0')+"-"+String(this.todayDate.getDay()).padStart(2, '0')
    this.callForm(fb)
  }

  ngOnInit() {
    
  }
 

  onSubmit(form: FormGroup) {
    //check required fields

    if(!form.value.name.localeCompare('') && !form.value.email.localeCompare('')){
      window.scroll(0, 0);
      this.requirementMessage= "Name and E-mail are required fields";
    }
    else if(!form.value.name.localeCompare('')){
      window.scroll(0, 0);
      this.requirementMessage= "Name is a required field";
    }
    else if(!form.value.email.localeCompare('')){
      window.scroll(0, 0);
      this.requirementMessage= "E-mail is a required field";
    }
    else{
        let addressComplete: string= "";
        let addressList: Array<string>= []
        for(let key of form.value.address){
          if(key.door_no.localeCompare('')&&key.street.localeCompare('')&&key.zipcode.toString().localeCompare('')){
            addressComplete= key.door_no+","+key.street+","+key.zipcode;
          }
          else{
            addressComplete= "nil"
          }
          addressList.push(addressComplete);
        }
        if(addressList.length == 0){
          form.value.address= "nil"
        }
        else{
          form.value.address= addressList;
        }
        this.userList.push(form.value);    
        this.requirementMessage= ""
        this.formReset(form)
        this.callForm(new FormBuilder())
    }
  }

  formReset(formL: FormGroup){
    this.userForm.reset(formL)
  }
  delete(index: number){
    console.log("here")
    this.userList.splice(index, 1);
  }
}

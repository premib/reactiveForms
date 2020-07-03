import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveForms';
  userForm;

  constructor(private fb: FormBuilder) {
    this.userForm= this.fb.group({
      'name': fb.control('', [Validators.required, Validators.maxLength(20)] ),
      'age': fb.control('', Validators.required),
      'country': fb.control('IN'),
      'email': fb.control(''),
      'mobile': fb.control('')
    })
  }

  ngOnInit() {
  
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.country);
  }
}

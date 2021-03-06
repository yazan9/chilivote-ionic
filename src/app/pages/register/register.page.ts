import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loadingSubscription: Subscription;
  loading: boolean = false;
  registrationForm: FormGroup;

  constructor(
    private router: Router, 
    private auth: AuthenticationService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.auth.loading$.subscribe((loading) => {
      this.loading = false;
    });

    this.registrationForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  emailRegister(){
    if(!this.registrationForm.valid) return;
    this.auth.emailRegister(this.email.value, this.password.value);
  }

  get email(){return this.registrationForm.get('email')}
  get password(){return this.registrationForm.get('password')}

}

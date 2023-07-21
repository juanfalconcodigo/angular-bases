import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  router = inject(Router);

  ngOnInit(): void {
    let me = this;
    me.__formLogin();
  }

  __formLogin() {
    let me = this;
    me.formLogin = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    });
  }

  submit() {
    let me = this;
    if (me.formLogin.invalid) {
      console.log('[FORM-INVALID]', me.formLogin.value);
      return
    }
    console.log('[FORM-VALID]', me.formLogin.value);
    localStorage.setItem('token','12345');
    me.router.navigate(['admin']);
  }




}

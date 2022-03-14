import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  template: `
    <h1 class="sign-up-title">ろぐいん</h1>
    <div mat-dialog-contents class="form-area">
      <form [formGroup]="form">
        <mat-form-field appearance="fill" [hideRequiredMarker]="true">
          <mat-label>めーるあどれす</mat-label>
          <input matInput placeholder="sample@example.com" formControlName="email" required>
          <mat-error *ngIf="form.invalid">にゅうりょくしてください</mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" [hideRequiredMarker]="true">
          <mat-label>ぱすわーど</mat-label>
          <input matInput [type]="hide ? 'password' : 'text'" formControlName="password" required>
          <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
            <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
          <mat-error *ngIf="form.invalid">にゅうりょくしてください</mat-error>
        </mat-form-field>
      </form>
      <button type="button" (click)="login()" class="sign-in-button">ろぐいん</button>
    </div>
  `,
  styles: [`
    h1{
      text-align: center;
      margin-top: 5%;
    }
    form{
      display: flex;
      flex-direction: column;
    }
    .form-area{
      display: flex;
      flex-direction: column;
      width: 70%;
      max-width: 450px;
      margin: auto;
      padding: 10px;
    }
    mat-form-field{
      padding-bottom:1rem;
    }
    .sign-in-button{
      max-width: 200px;
      align-self: flex-end;
    }
  `]
})
export class AuthComponent {

  hide = true;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  login(){
    let email = this.form.controls['email'].value;
    let password = this.form.controls['password'].value;
    this.authService.login(email, password)
      .then(() => this.router.navigate(['home']))
  }
}

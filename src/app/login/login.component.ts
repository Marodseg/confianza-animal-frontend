import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LOAD_CATS, LOAD_DOGS } from '../state/actions/animals.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { LOAD_ORGANIZATION } from '../state/actions/organization.actions';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class LoginComponent {
  showForgotPasswordInput = false;

  public loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor(
    private router: Router,
    public authService: AuthService,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public login(): void {
    this.authService.login(this.loginForm.getRawValue()).subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.toastr.error(error.error.detail, '', { timeOut: 4000 });
      }
    );
  }
}

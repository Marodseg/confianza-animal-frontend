import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent {
  restoreForm = new FormGroup({
    email: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor(
    public authService: AuthService,
    public toastr: ToastrService,
    public router: Router
  ) {}

  get email() {
    return this.restoreForm.get('email');
  }

  restorePassword() {
    this.authService
      .restorePassword(this.email?.value ? this.email.value : '')
      .subscribe(
        data => {
          this.toastr.success(data.message, '', { timeOut: 4000 });
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error(error.error.detail, '', { timeOut: 4000 });
        }
      );
  }
}

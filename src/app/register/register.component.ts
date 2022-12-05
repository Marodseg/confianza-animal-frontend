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
import { UserService } from '../../services/user/user.service';
import { FilterService } from '../../services/filter/filter.service';
import { first, shareReplay } from 'rxjs';
import { isProvince } from '../../utils';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  public registerForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    phone: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    province: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    confirmPassword: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor(
    public authService: AuthService,
    public toastr: ToastrService,
    private router: Router,
    public userService: UserService,
    public filterService: FilterService
  ) {}

  provinces$ = this.filterService.getProvinces();
  provinces: [string] = [''];

  ngOnInit(): void {
    this.provinces$.pipe(first()).subscribe(data => {
      data.forEach(province => {
        this.provinces.push(province);
      });
    }, shareReplay());
  }

  get name() {
    return this.registerForm.get('name');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get province() {
    return this.registerForm.get('province');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  register() {
    const register = {
      name: this.name?.value ? this.name.value : '',
      email: this.email?.value ? this.email.value : '',
      password: this.password?.value ? this.password.value : '',
      phone: this.phone?.value ? this.phone.value : '',
      zone: this.province?.value ? this.province.value : '',
    };

    this.userService.register(register).subscribe(
      data => {
        this.router.navigate(['/login']);
        this.toastr.success(
          'Correo de verificación enviado a ' + data['email'],
          'Registro exitoso',
          { timeOut: 4000 }
        );
      },
      error => {
        this.toastr.error(error.error.detail, '', { timeOut: 4000 });
      }
    );
  }

  checkProvince(province?: string): boolean {
    return isProvince(this.provinces, province);
  }
}

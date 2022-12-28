import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Organization } from '../interfaces/interfaces';
import { first, shareReplay } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterService } from '../../services/filter/filter.service';
import { processFile } from 'src/utils';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  organization$ = this.userService.getUserProfile();

  initialName = '';
  initialPhone = '';
  initialZone = '';

  constructor(
    public userService: UserService,
    public toastr: ToastrService,
    public filterService: FilterService
  ) {}

  provinces$ = this.filterService.getProvinces();
  provinces: [string] = [''];

  public profileForm = new FormGroup({
    phone: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    zone: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  ngOnInit() {
    this.provinces$.pipe(first()).subscribe(data => {
      data.forEach(province => {
        this.provinces.push(province);
      });
    }, shareReplay());

    this.organization$.subscribe((organization: Organization) => {
      this.initialPhone = organization.phone;
      this.initialZone = organization.zone;
      this.profileForm.patchValue({
        phone: organization.phone,
        zone: organization.zone,
      });
    });
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get zone() {
    return this.profileForm.get('zone');
  }

  public updateProfile() {
    let userParams = {};
    if (this.profileForm.value.phone !== this.initialPhone) {
      userParams = {
        ...userParams,
        phone: this.profileForm.value.phone,
      };
    }
    if (this.profileForm.value.zone !== this.initialZone) {
      userParams = {
        ...userParams,
        zone: this.profileForm.value.zone,
      };
    }

    this.userService.updateUser(userParams).subscribe(
      res => {
        this.toastr.success('Perfil actualizado con éxito', '', {
          timeOut: 4000,
        });
      },
      err => {
        this.toastr.error(err.error.detail, '', { timeOut: 4000 });
      }
    );
  }

  isProvince(province?: string): boolean {
    if (province) {
      return this.provinces.includes(province);
    }
    return false;
  }

  processImage(imageInput: any) {
    processFile(imageInput, this.userService, this.toastr);
    this.toastr.success('Imagen subida con éxito', '', { timeOut: 4000 });
  }
}

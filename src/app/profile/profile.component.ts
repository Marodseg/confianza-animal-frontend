import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Organization } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FilterService } from '../../services/filter/filter.service';
import { isProvince, processFile } from 'src/utils';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectProvincesItems } from '../state/selectors/filters.selectors';
import { selectOrganizationItems } from '../state/selectors/organization.selectors';
import { LOAD_ORGANIZATION } from '../state/actions/organization.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  initialName: string | undefined = '';
  initialPhone: string | undefined = '';
  initialZone: string | undefined = '';

  constructor(
    public userService: UserService,
    public toastr: ToastrService,
    public filterService: FilterService,
    private store: Store<AppState>
  ) {}

  provinces$ = this.store.select(selectProvincesItems);
  organization$ = this.store.select(selectOrganizationItems);

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
    this.store.select(selectOrganizationItems).subscribe(data => {
      this.initialName = data?.name;
      this.initialPhone = data?.phone;
      this.initialZone = data?.zone;
      this.profileForm.patchValue({
        phone: data?.phone,
        zone: data?.zone,
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

  checkProvince(province?: string): boolean {
    let provinces = [''];
    this.store.select(selectProvincesItems).subscribe(data => {
      provinces = data;
    });
    return isProvince(provinces, province);
  }

  processImage(imageInput: any) {
    processFile(imageInput, this.userService, this.toastr);
    this.toastr.success('Imagen subida con éxito', '', { timeOut: 4000 });
  }
}

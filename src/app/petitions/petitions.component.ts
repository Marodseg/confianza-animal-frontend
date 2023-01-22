import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { Cat, Dog, Petition } from '../interfaces/interfaces';
import { Router, RouterModule } from '@angular/router';
import { FilterService } from '../../services/filter/filter.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectCatRazesItems,
  selectDogRazesItems,
} from '../state/selectors/filters.selectors';
import { AppState } from '../state/app.state';
import { selectPetitionsItems } from '../state/selectors/organization.selectors';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-petitions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatTooltipModule,
  ],
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class PetitionsComponent implements OnInit {
  constructor(
    private userService: UserService,
    public router: Router,
    private filterService: FilterService,
    public toastrService: ToastrService,
    private modalService: NgbModal,
    private store: Store<AppState>
  ) {}

  open(content: any) {
    if (content) {
      this.modalService.open(content, { centered: true });
    }
  }

  petitions: Petition[] = [];
  dogRaze: string[] = [''];
  catRaze: string[] = [''];
  orgMessage = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  informationForm = new FormGroup({
    home_type_bool: new FormControl(false, {
      nonNullable: true,
    }),
    free_time_bool: new FormControl(false, {
      nonNullable: true,
    }),
    frequency_travel_bool: new FormControl(false, {
      nonNullable: true,
    }),
    previous_experience_bool: new FormControl(false, {
      nonNullable: true,
    }),
    kids_bool: new FormControl(false, {
      nonNullable: true,
    }),
    other_animals_bool: new FormControl(false, {
      nonNullable: true,
    }),
  });

  get home_type_bool() {
    return this.informationForm.get('home_type_bool')?.value === true;
  }

  get free_time_bool() {
    return this.informationForm.get('free_time_bool')?.value === true;
  }

  get frequency_travel_bool() {
    return this.informationForm.get('frequency_travel_bool')?.value === true;
  }

  get previous_experience_bool() {
    return this.informationForm.get('previous_experience_bool')?.value === true;
  }

  get kids_bool() {
    return this.informationForm.get('kids_bool')?.value === true;
  }

  get other_animals_bool() {
    return this.informationForm.get('other_animals_bool')?.value === true;
  }

  ngOnInit() {
    this.store.select(selectCatRazesItems).subscribe(data => {
      this.catRaze = data;
    });
    this.store.select(selectDogRazesItems).subscribe(data => {
      this.dogRaze = data;
    });
    this.store.select(selectPetitionsItems).subscribe(data => {
      this.petitions = data;
    });
  }

  editCat(id: string) {
    this.router.navigate(['edit/cat/' + id]);
  }
  editDog(id: string) {
    this.router.navigate(['edit/dog/' + id]);
  }

  rejectPetition(id: string, message: string) {
    this.userService.rejectPetition(id, message).subscribe(
      data => {
        this.toastrService.success(
          'La petición se ha eliminado correctamente',
          '',
          { timeOut: 5000 }
        );
        window.location.reload();
      },
      error => {
        this.toastrService.error(error.error.detail, '', { timeOut: 5000 });
      }
    );
  }

  acceptPetition(
    id: string,
    message: string,
    home_type_bool: boolean,
    free_time_bool: boolean,
    frequency_travel_bool: boolean,
    previous_experience_bool: boolean,
    kids_bool: boolean,
    other_pets_bool: boolean
  ) {
    this.userService
      .acceptPetition(
        id,
        message,
        home_type_bool,
        free_time_bool,
        frequency_travel_bool,
        previous_experience_bool,
        kids_bool,
        other_pets_bool
      )
      .subscribe(
        data => {
          this.toastrService.success(
            'La petición se ha aceptado correctamente',
            '',
            { timeOut: 5000 }
          );
          window.location.reload();
        },
        error => {
          this.toastrService.error(error.error.detail, '', { timeOut: 5000 });
        }
      );
  }

  updatePetition(id: string, message: string) {
    this.userService.updatePetition(id, message).subscribe(
      data => {
        this.toastrService.success(
          'La petición se ha actualizado correctamente',
          '',
          { timeOut: 5000 }
        );
        window.location.reload();
      },
      error => {
        this.toastrService.error(error.error.detail, '', { timeOut: 5000 });
      }
    );
  }

  rejectDocumentation(id: string, message: string) {
    this.userService.rejectDocumentation(id, message).subscribe(
      data => {
        this.toastrService.success(
          'La documentación se ha rechazado correctamente',
          '',
          { timeOut: 5000 }
        );
        window.location.reload();
      },
      error => {
        this.toastrService.error(error.error.detail, '', { timeOut: 5000 });
      }
    );
  }

  rejectInformation(
    id: string,
    message: string,
    home_type_bool: boolean,
    free_time_bool: boolean,
    frequency_travel_bool: boolean,
    previous_experience_bool: boolean,
    kids_bool: boolean,
    other_pets_bool: boolean
  ) {
    this.userService
      .rejectInformation(
        id,
        message,
        home_type_bool,
        free_time_bool,
        frequency_travel_bool,
        previous_experience_bool,
        kids_bool,
        other_pets_bool
      )
      .subscribe(
        data => {
          this.toastrService.success(
            'La información se ha rechazado correctamente',
            '',
            { timeOut: 5000 }
          );
          window.location.reload();
        },
        error => {
          this.toastrService.error(error.error.detail, '', { timeOut: 5000 });
        }
      );
  }
}

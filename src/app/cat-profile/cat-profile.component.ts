import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimalService } from '../../services/animals/animal.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {
  isSizeOption,
  isBooleanOption,
  processCatFiles,
  isActivityLevelOption,
  isGenderOption,
  isProvince,
  isCatRaze,
  checkMonthsValue,
} from 'src/utils';
import { FilterService } from '../../services/filter/filter.service';
import { first, Observable, shareReplay } from 'rxjs';
import {
  selectCatRazesItems,
  selectProvincesItems,
} from '../state/selectors/filters.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-cat-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgOptimizedImage],
  templateUrl: './cat-profile.component.html',
  styleUrls: ['./cat-profile.component.scss'],
  providers: [NgbModalConfig, NgbModal, ToastrService],
})
export class CatProfileComponent implements OnInit {
  cat$ = this.animalService.getCat(this.route.snapshot.params.id);
  provinces$: Observable<string[]> = new Observable<string[]>();

  catRazes$ = new Observable<string[]>();

  initialName = '';
  initialYears = -1;
  initialMonths = -1;
  initialGender = '';
  initialWeight = 0;
  initialSize = '';
  initialRaze = '';
  initialZone = '';
  initialNeutered = '';
  initialDescription = '';
  initialHealthy = '';
  initialWormed = '';
  initialVaccinated = '';
  initialBirthDate = '';
  initialActivityLevel = '';
  initialMicrochip = '';
  initialUrgency = '';

  catForm = new FormGroup({
    name: new FormControl('', Validators.required),
    years: new FormControl(0, { nonNullable: false }),
    months: new FormControl(0, {
      validators: [Validators.min(1), Validators.max(11)],
      nonNullable: false,
    }),
    gender: new FormControl('', Validators.required),
    weight: new FormControl(0, Validators.required),
    size: new FormControl('', Validators.required),
    raze: new FormControl('', { nonNullable: true }),
    zone: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    neutered: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    healthy: new FormControl('', Validators.required),
    wormed: new FormControl('', Validators.required),
    vaccinated: new FormControl('', Validators.required),
    birthDate: new FormControl(''),
    activityLevel: new FormControl('', Validators.required),
    microchip: new FormControl('', Validators.required),
    isUrgent: new FormControl('', Validators.required),
  });

  constructor(
    public animalService: AnimalService,
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public toastr: ToastrService,
    private modalService: NgbModal,
    private filterService: FilterService,
    private store: Store<AppState>
  ) {}

  open(content: any) {
    if (content) {
      this.modalService.open(content, { centered: true });
    }
  }

  get healthy() {
    return this.catForm.get('healthy');
  }

  get wormed() {
    return this.catForm.get('wormed');
  }

  get vaccinated() {
    return this.catForm.get('vaccinated');
  }

  get neutered() {
    return this.catForm.get('neutered');
  }

  get microchip() {
    return this.catForm.get('microchip');
  }

  get isUrgent() {
    return this.catForm.get('isUrgent');
  }

  get gender() {
    return this.catForm.get('gender');
  }

  get size() {
    return this.catForm.get('size');
  }

  get raze() {
    return this.catForm.get('raze');
  }

  get province() {
    return this.catForm.get('zone');
  }

  get months() {
    return this.catForm.get('months');
  }

  get activityLevel() {
    return this.catForm.get('activityLevel');
  }

  ngOnInit(): void {
    this.provinces$ = this.store.select(selectProvincesItems);
    this.catRazes$ = this.store.select(selectCatRazesItems);

    this.cat$.subscribe(cat => {
      this.initialName = cat.name;
      this.initialYears = cat.years;
      this.initialMonths = cat.months;
      this.initialGender = cat.gender;
      this.initialWeight = cat.weight;
      this.initialSize = cat.size;
      this.initialRaze = cat.raze;
      this.initialZone = cat.zone;
      this.initialNeutered = cat.neutered.toString();
      this.initialDescription = cat.description;
      this.initialHealthy = cat.healthy.toString();
      this.initialWormed = cat.wormed.toString();
      this.initialVaccinated = cat.vaccinated.toString();
      this.initialBirthDate = cat.birth_date ? cat.birth_date.toString() : '';
      this.initialActivityLevel = cat.activity_level;
      this.initialMicrochip = cat.microchip.toString();
      this.initialUrgency = cat.is_urgent.toString();

      this.catForm.patchValue({
        name: cat.name,
        years: cat.years,
        months: cat.months,
        gender: cat.gender,
        weight: cat.weight,
        size: cat.size,
        raze: cat.raze,
        zone: cat.zone,
        neutered: cat.neutered.toString(),
        description: cat.description,
        healthy: cat.healthy.toString(),
        wormed: cat.wormed.toString(),
        vaccinated: cat.vaccinated.toString(),
        birthDate: moment(cat.birth_date).utc().format('YYYY-MM-DD'),
        activityLevel: cat.activity_level,
        microchip: cat.microchip.toString(),
        isUrgent: cat.is_urgent.toString(),
      });
    });
  }

  processImages(imageInput: any) {
    processCatFiles(
      imageInput,
      this.userService,
      this.toastr,
      this.animalService,
      this.route.snapshot.params.id
    );
  }

  updateCat() {
    let catParams = {};
    if (this.catForm.value.name !== this.initialName) {
      catParams = { ...catParams, name: this.catForm.value.name };
    }
    if (this.catForm.value.years !== this.initialYears) {
      if (this.catForm.value.years === null) {
        catParams = { ...catParams, years: 0 };
      } else {
        catParams = { ...catParams, years: this.catForm.value.years };
      }
    }

    if (this.catForm.value.months !== this.initialMonths) {
      if (this.catForm.value.months === null) {
        catParams = { ...catParams, months: 0 };
      } else {
        catParams = { ...catParams, months: this.catForm.value.months };
      }
    }

    if (this.catForm.value.gender !== this.initialGender) {
      catParams = {
        ...catParams,
        gender: this.catForm.value.gender === 'Macho' ? 'male' : 'female',
      };
    }

    if (this.catForm.value.weight !== this.initialWeight) {
      catParams = { ...catParams, weight: this.catForm.value.weight };
    }

    if (this.catForm.value.size !== this.initialSize) {
      catParams = {
        ...catParams,
        size:
          this.catForm.value.size === 'Mini'
            ? 'mini'
            : this.catForm.value.size === 'Pequeño'
            ? 'small'
            : this.catForm.value.size === 'Mediano'
            ? 'medium'
            : this.catForm.value.size === 'Grande'
            ? 'big'
            : 'very big',
      };
    }

    if (this.catForm.value.raze !== this.initialRaze) {
      catParams = { ...catParams, raze: this.catForm.value.raze };
    }

    if (this.catForm.value.zone !== this.initialZone) {
      catParams = { ...catParams, zone: this.catForm.value.zone };
    }

    if (this.catForm.value.neutered !== this.initialNeutered) {
      catParams = {
        ...catParams,
        neutered: this.catForm.value.neutered === 'Si',
      };
    }

    if (this.catForm.value.description !== this.initialDescription) {
      catParams = { ...catParams, description: this.catForm.value.description };
    }

    if (this.catForm.value.healthy !== this.initialHealthy) {
      catParams = {
        ...catParams,
        healthy: this.catForm.value.healthy === 'Si',
      };
    }

    if (this.catForm.value.wormed !== this.initialWormed) {
      catParams = { ...catParams, wormed: this.catForm.value.wormed === 'Si' };
    }

    if (this.catForm.value.vaccinated !== this.initialVaccinated) {
      catParams = {
        ...catParams,
        vaccinated: this.catForm.value.vaccinated === 'Si',
      };
    }

    if (this.catForm.value.birthDate !== this.initialBirthDate) {
      catParams = { ...catParams, birth_date: this.catForm.value.birthDate };
    }

    if (this.catForm.value.activityLevel !== this.initialActivityLevel) {
      catParams = {
        ...catParams,
        activity_level:
          this.catForm.value.activityLevel === 'Baja'
            ? 'low'
            : this.catForm.value.activityLevel === 'Media'
            ? 'medium'
            : 'high',
      };
    }

    if (this.catForm.value.microchip !== this.initialMicrochip) {
      catParams = {
        ...catParams,
        microchip: this.catForm.value.microchip === 'Si',
      };
    }

    if (this.catForm.value.isUrgent !== this.initialUrgency) {
      catParams = {
        ...catParams,
        is_urgent: this.catForm.value.isUrgent === 'Si',
      };
    }

    this.animalService
      .editCat(catParams, this.route.snapshot.params.id)
      .subscribe(
        res => {
          this.toastr.success(
            'Se ha actualizado ' + this.catForm.value.name + '  exitosamente',
            '',
            {
              timeOut: 4000,
            }
          );
          window.location.reload();
        },
        err => {
          this.toastr.error(err.error.detail, '', { timeOut: 4000 });
        }
      );
  }

  deleteCatPhoto(photo: string) {
    this.animalService
      .deleteCatPhoto(this.route.snapshot.params.id, photo)
      .subscribe(
        res => {
          this.toastr.success('La foto se ha eliminado correctamente', '', {
            timeOut: 4000,
          });
          window.location.reload();
        },
        err => {
          this.toastr.error(err.error.detail, '', { timeOut: 4000 });
        }
      );
  }

  isBooleanOption(option?: string): boolean {
    return isBooleanOption(option);
  }

  isSizeOption(option?: string): boolean {
    return isSizeOption(option);
  }

  isActivityLevelOption(option?: string): boolean {
    return isActivityLevelOption(option);
  }

  isGenderOption(option?: string): boolean {
    return isGenderOption(option);
  }

  checkProvince(province?: string): boolean {
    let provinces = [''];
    this.store.select(selectProvincesItems).subscribe(data => {
      provinces = data;
    });
    return isProvince(provinces, province);
  }

  checkCatRaze(raze?: string): boolean {
    let catRazes = [''];
    this.store.select(selectCatRazesItems).subscribe(data => {
      catRazes = data;
    });
    return isCatRaze(catRazes, raze);
  }

  checkMonths(months?: any): boolean {
    return checkMonthsValue(months);
  }
}

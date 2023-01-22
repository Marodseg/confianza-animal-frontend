import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  isActivityLevelOption,
  isBooleanOption,
  isGenderOption,
  isProvince,
  isSizeOption,
} from 'src/utils';
import { Router, RouterModule } from '@angular/router';
import { AnimalService } from '../../services/animals/animal.service';
import { FilterService } from '../../services/filter/filter.service';
import { first, Observable, shareReplay } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  selectCatRazesItems,
  selectDogRazesItems,
  selectProvincesItems,
} from '../state/selectors/filters.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ADD_CAT, ADD_DOG } from '../state/actions/animals.actions';

@Component({
  selector: 'app-new-animal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.scss'],
  providers: [ToastrService],
})
export class NewAnimalComponent implements OnInit {
  addAnimalForm = new FormGroup({
    addDog: new FormControl(true),
    addCat: new FormControl(false),
  });

  newAnimalForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    age: new FormControl({
      validators: [Validators.required],
      nonNullable: true,
    }),
    gender: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    weight: new FormControl({
      validators: [Validators.required],
      nonNullable: true,
    }),
    size: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    raze: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    province: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    neutered: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    healthy: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    wormed: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    vaccinated: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    birthDate: new FormControl('', { nonNullable: false }),
    activityLevel: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    microchip: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    isUrgent: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  isDog = this.router.getCurrentNavigation()?.extras?.state?.isDog;

  constructor(
    private animalService: AnimalService,
    private filterService: FilterService,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {}

  dogRazes$: Observable<string[]> = new Observable<string[]>();
  catRazes$: Observable<string[]> = new Observable<string[]>();
  provinces$: Observable<string[]> = new Observable<string[]>();

  ngOnInit(): void {
    this.dogRazes$ = this.store.select(selectDogRazesItems);
    this.catRazes$ = this.store.select(selectCatRazesItems);
    this.provinces$ = this.store.select(selectProvincesItems);

    this.addAnimalForm.controls.addDog.valueChanges.subscribe(value => {
      if (value) {
        this.addAnimalForm.patchValue({ addCat: false });
      }
    });
    this.addAnimalForm.controls.addCat.valueChanges.subscribe(value => {
      if (value) {
        this.addAnimalForm.patchValue({ addDog: false });
      }
    });

    if (this.isDog) {
      this.addAnimalForm.patchValue({ addDog: true });
      this.addAnimalForm.patchValue({ addCat: false });
    } else {
      this.addAnimalForm.patchValue({ addDog: false });
      this.addAnimalForm.patchValue({ addCat: true });
    }
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

  get healthy() {
    return this.newAnimalForm.get('healthy');
  }

  get wormed() {
    return this.newAnimalForm.get('wormed');
  }

  get vaccinated() {
    return this.newAnimalForm.get('vaccinated');
  }

  get neutered() {
    return this.newAnimalForm.get('neutered');
  }

  get microchip() {
    return this.newAnimalForm.get('microchip');
  }

  get isUrgent() {
    return this.newAnimalForm.get('isUrgent');
  }

  get gender() {
    return this.newAnimalForm.get('gender');
  }

  get size() {
    return this.newAnimalForm.get('size');
  }

  get activityLevel() {
    return this.newAnimalForm.get('activityLevel');
  }

  get raze() {
    return this.newAnimalForm.get('raze');
  }

  get province() {
    return this.newAnimalForm.get('province');
  }

  get name() {
    return this.newAnimalForm.get('name');
  }

  get age() {
    return this.newAnimalForm.get('age');
  }

  get weight() {
    return this.newAnimalForm.get('weight');
  }

  get description() {
    return this.newAnimalForm.get('description');
  }

  get addDog() {
    return this.addAnimalForm.get('addDog');
  }

  get addCat() {
    return this.addAnimalForm.get('addCat');
  }

  createDog() {
    const dog = {
      name: this.newAnimalForm.get('name')?.value,
      age: this.newAnimalForm.get('age')?.value,
      gender: this.newAnimalForm.get('gender')?.value,
      weight: this.newAnimalForm.get('weight')?.value,
      size: this.newAnimalForm.get('size')?.value,
      raze: this.newAnimalForm.get('raze')?.value,
      zone: this.newAnimalForm.get('province')?.value,
      description: this.newAnimalForm.get('description')?.value,
      healthy: this.newAnimalForm.get('healthy')?.value,
      wormed: this.newAnimalForm.get('wormed')?.value,
      vaccinated: this.newAnimalForm.get('vaccinated')?.value,
      birth_date: this.newAnimalForm.get('birthDate')?.value,
      activityLevel: this.newAnimalForm.get('activityLevel')?.value,
      microchip: this.newAnimalForm.get('microchip')?.value,
      isUrgent: this.newAnimalForm.get('isUrgent')?.value,
    };

    this.store.dispatch(ADD_DOG({ dog }));
  }

  createCat() {
    const cat = {
      name: this.newAnimalForm.get('name')?.value,
      age: this.newAnimalForm.get('age')?.value,
      gender: this.newAnimalForm.get('gender')?.value,
      weight: this.newAnimalForm.get('weight')?.value,
      size: this.newAnimalForm.get('size')?.value,
      raze: this.newAnimalForm.get('raze')?.value,
      zone: this.newAnimalForm.get('province')?.value,
      description: this.newAnimalForm.get('description')?.value,
      healthy: this.newAnimalForm.get('healthy')?.value,
      wormed: this.newAnimalForm.get('wormed')?.value,
      vaccinated: this.newAnimalForm.get('vaccinated')?.value,
      birth_date: this.newAnimalForm.get('birthDate')?.value,
      activityLevel: this.newAnimalForm.get('activityLevel')?.value,
      microchip: this.newAnimalForm.get('microchip')?.value,
      isUrgent: this.newAnimalForm.get('isUrgent')?.value,
    };

    this.store.dispatch(ADD_CAT({ cat }));
  }

  isDogRaze(raze?: string): boolean {
    let dogRazes = [''];
    this.store.select(selectDogRazesItems).subscribe(data => {
      dogRazes = data;
    });
    if (raze) {
      return dogRazes.includes(raze);
    }
    return false;
  }

  isCatRaze(raze?: string): boolean {
    let catRazes = [''];
    this.store.select(selectCatRazesItems).subscribe(data => {
      catRazes = data;
    });
    if (raze) {
      return catRazes.includes(raze);
    }
    return false;
  }

  checkProvince(province?: string): boolean {
    let provinces = [''];
    this.store.select(selectProvincesItems).subscribe(data => {
      provinces = data;
    });
    return isProvince(provinces, province);
  }
}

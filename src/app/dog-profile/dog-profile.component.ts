import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimalService } from '../../services/animals/animal.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import {
  isActivityLevelOption,
  isBooleanOption,
  isDogRaze,
  isGenderOption,
  isProvince,
  isSizeOption,
  processDogFiles,
} from '../../utils';
import * as moment from 'moment';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from '../../services/filter/filter.service';
import { first, shareReplay } from 'rxjs';

@Component({
  selector: 'app-dog-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.scss'],
  providers: [NgbModalConfig, NgbModal, ToastrService],
})
export class DogProfileComponent implements OnInit {
  dog$ = this.animalService.getDog(this.route.snapshot.params.id);
  dogPhotos: string[] = [];

  provinces$ = this.filterService.getProvinces();
  provinces: string[] = [''];

  dogRazes$ = this.filterService.getDogRazes();
  razes: string[] = [''];

  initialName = '';
  initialAge = 0;
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

  dogForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
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
    private filterService: FilterService
  ) {}

  open(content: any) {
    if (content) {
      this.modalService.open(content);
    }
  }

  get healthy() {
    return this.dogForm.get('healthy');
  }

  get wormed() {
    return this.dogForm.get('wormed');
  }

  get vaccinated() {
    return this.dogForm.get('vaccinated');
  }

  get neutered() {
    return this.dogForm.get('neutered');
  }

  get microchip() {
    return this.dogForm.get('microchip');
  }

  get isUrgent() {
    return this.dogForm.get('isUrgent');
  }

  get gender() {
    return this.dogForm.get('gender');
  }

  get size() {
    return this.dogForm.get('size');
  }

  get raze() {
    return this.dogForm.get('raze');
  }

  get province() {
    return this.dogForm.get('zone');
  }

  get activityLevel() {
    return this.dogForm.get('activityLevel');
  }

  ngOnInit(): void {
    this.provinces$.pipe(first()).subscribe(data => {
      data.forEach(province => {
        this.provinces.push(province);
      });
    }, shareReplay());

    this.dogRazes$.pipe(first()).subscribe(data => {
      data.forEach(raze => {
        this.razes.push(raze);
      });
    }, shareReplay());

    this.dog$.subscribe(dog => {
      this.dogPhotos = dog.photos;

      this.initialName = dog.name;
      this.initialAge = dog.age;
      this.initialGender = dog.gender;
      this.initialWeight = dog.weight;
      this.initialSize = dog.size;
      this.initialRaze = dog.raze;
      this.initialZone = dog.zone;
      this.initialNeutered = dog.neutered.toString();
      this.initialDescription = dog.description;
      this.initialHealthy = dog.healthy.toString();
      this.initialWormed = dog.wormed.toString();
      this.initialVaccinated = dog.vaccinated.toString();
      this.initialBirthDate = dog.birth_date ? dog.birth_date.toString() : '';
      this.initialActivityLevel = dog.activity_level;
      this.initialMicrochip = dog.microchip.toString();
      this.initialUrgency = dog.is_urgent.toString();

      this.dogForm.patchValue({
        name: dog.name,
        age: dog.age,
        gender: dog.gender,
        weight: dog.weight,
        size: dog.size,
        raze: dog.raze,
        zone: dog.zone,
        neutered: dog.neutered.toString(),
        description: dog.description,
        healthy: dog.healthy.toString(),
        wormed: dog.wormed.toString(),
        vaccinated: dog.vaccinated.toString(),
        birthDate: moment(dog.birth_date).utc().format('YYYY-MM-DD'),
        activityLevel: dog.activity_level,
        microchip: dog.microchip.toString(),
        isUrgent: dog.is_urgent.toString(),
      });
    });
  }

  processImages(imageInput: any) {
    processDogFiles(
      imageInput,
      this.userService,
      this.toastr,
      this.animalService,
      this.route.snapshot.params.id
    );
  }

  updateDog() {
    let dogParams = {};
    if (this.dogForm.value.name !== this.initialName) {
      dogParams = { ...dogParams, name: this.dogForm.value.name };
    }
    if (this.dogForm.value.age !== this.initialAge) {
      dogParams = { ...dogParams, age: this.dogForm.value.age };
    }
    if (this.dogForm.value.gender !== this.initialGender) {
      dogParams = {
        ...dogParams,
        gender: this.dogForm.value.gender === 'Macho' ? 'male' : 'female',
      };
    }

    if (this.dogForm.value.weight !== this.initialWeight) {
      dogParams = { ...dogParams, weight: this.dogForm.value.weight };
    }

    if (this.dogForm.value.size !== this.initialSize) {
      dogParams = {
        ...dogParams,
        size:
          this.dogForm.value.size === 'Mini'
            ? 'mini'
            : this.dogForm.value.size === 'Pequeño'
            ? 'small'
            : this.dogForm.value.size === 'Mediano'
            ? 'medium'
            : this.dogForm.value.size === 'Grande'
            ? 'big'
            : 'very big',
      };
    }

    if (this.dogForm.value.raze !== this.initialRaze) {
      dogParams = { ...dogParams, raze: this.dogForm.value.raze };
    }

    if (this.dogForm.value.zone !== this.initialZone) {
      dogParams = { ...dogParams, zone: this.dogForm.value.zone };
    }

    if (this.dogForm.value.neutered !== this.initialNeutered) {
      dogParams = {
        ...dogParams,
        neutered: this.dogForm.value.neutered === 'Si',
      };
    }

    if (this.dogForm.value.description !== this.initialDescription) {
      dogParams = { ...dogParams, description: this.dogForm.value.description };
    }

    if (this.dogForm.value.healthy !== this.initialHealthy) {
      dogParams = {
        ...dogParams,
        healthy: this.dogForm.value.healthy === 'Si',
      };
    }

    if (this.dogForm.value.wormed !== this.initialWormed) {
      dogParams = { ...dogParams, wormed: this.dogForm.value.wormed === 'Si' };
    }

    if (this.dogForm.value.vaccinated !== this.initialVaccinated) {
      dogParams = {
        ...dogParams,
        vaccinated: this.dogForm.value.vaccinated === 'Si',
      };
    }

    if (this.dogForm.value.birthDate !== this.initialBirthDate) {
      dogParams = { ...dogParams, birth_date: this.dogForm.value.birthDate };
    }

    if (this.dogForm.value.activityLevel !== this.initialActivityLevel) {
      dogParams = {
        ...dogParams,
        activity_level:
          this.dogForm.value.activityLevel === 'Baja'
            ? 'low'
            : this.dogForm.value.activityLevel === 'Media'
            ? 'medium'
            : 'high',
      };
    }

    if (this.dogForm.value.microchip !== this.initialMicrochip) {
      dogParams = {
        ...dogParams,
        microchip: this.dogForm.value.microchip === 'Si',
      };
    }

    if (this.dogForm.value.isUrgent !== this.initialUrgency) {
      dogParams = {
        ...dogParams,
        is_urgent: this.dogForm.value.isUrgent === 'Si',
      };
    }

    this.animalService
      .editDog(dogParams, this.route.snapshot.params.id)
      .subscribe(
        res => {
          this.toastr.success(
            'Se ha actualizado ' + this.dogForm.value.name + '  exitosamente',
            '',
            {
              timeOut: 4000,
            }
          );
          this.router.navigate(['/animals']);
        },
        err => {
          this.toastr.error(err.error.detail, '', { timeOut: 4000 });
        }
      );
  }

  deleteDogPhoto(photo: string) {
    this.animalService
      .deleteDogPhoto(this.route.snapshot.params.id, photo)
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
    return isProvince(this.provinces, province);
  }

  checkDogRaze(raze?: string): boolean {
    return isDogRaze(this.razes, raze);
  }
}

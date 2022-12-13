import { UserService } from './services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AnimalService } from './services/animals/animal.service';

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

export function processFile(
  imageInput: any,
  userService: UserService,
  toastr: ToastrService
) {
  const file: File = imageInput.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', (event: any) => {
    let selectedFile = new ImageSnippet(event.target.result, file);

    userService.uploadPhoto(selectedFile.file).subscribe(
      res => {
        toastr.success('Imagen subida con éxito', '', { timeOut: 4000 });
        window.location.reload();
      },
      err => {
        toastr.error(err.error.detail, '', { timeOut: 4000 });
      }
    );
  });

  reader.readAsDataURL(file);
}

export function processDogFiles(
  imageInput: any,
  userService: UserService,
  toastr: ToastrService,
  animalService: AnimalService,
  animalId: string
) {
  const files: File[] = imageInput.files;

  userService.uploadAnimalPhotos(files, animalId).subscribe(
    res => {
      if (files.length > 1) {
        toastr.success('Imagenes subidas con éxito', '', { timeOut: 4000 });
      } else {
        toastr.success('Imagen subida con éxito', '', { timeOut: 4000 });
      }
      window.location.reload();
    },
    err => {
      toastr.error(err.error.detail, '', { timeOut: 4000 });
    }
  );
}

export function processCatFiles(
  imageInput: any,
  userService: UserService,
  toastr: ToastrService,
  animalService: AnimalService,
  animalId: string
) {
  const files: File[] = imageInput.files;

  userService.uploadAnimalPhotos(files, animalId, false).subscribe(
    res => {
      if (files.length > 1) {
        toastr.success('Imagenes subidas con éxito', '', { timeOut: 4000 });
      } else {
        toastr.success('Imagen subida con éxito', '', { timeOut: 4000 });
      }
      window.location.reload();
    },
    err => {
      toastr.error(err.error.detail, '', { timeOut: 4000 });
    }
  );
}

export function isBooleanOption(option?: string): boolean {
  if (option) {
    return option === 'Si' || option === 'No';
  }
  return false;
}

export function isSizeOption(option?: string): boolean {
  if (option) {
    return (
      option === 'Mini' ||
      option === 'Pequeño' ||
      option === 'Mediano' ||
      option === 'Grande' ||
      option === 'Gigante'
    );
  }
  return false;
}

export function isActivityLevelOption(option?: string): boolean {
  if (option) {
    return option === 'Baja' || option === 'Media' || option === 'Alta';
  }
  return false;
}

export function isGenderOption(option?: string): boolean {
  if (option) {
    return option === 'Macho' || option === 'Hembra';
  }
  return false;
}

export function addAnimal(isDog: boolean, router: Router) {
  router.navigate(['/new/animal'], { state: { isDog: isDog } });
}

export function isProvince(provinces: string[], province?: string): boolean {
  if (province) {
    return provinces.includes(province);
  }
  return false;
}

export function isDogRaze(dogRazes: string[], raze?: string): boolean {
  if (raze) {
    return dogRazes.includes(raze);
  }
  return false;
}

export function isCatRaze(catRazes: string[], raze?: string): boolean {
  if (raze) {
    return catRazes.includes(raze);
  }
  return false;
}

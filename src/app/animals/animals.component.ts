import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AnimalService } from '../../services/animals/animal.service';
import { Observable } from 'rxjs';
import { Cat, Dog } from '../interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { addAnimal } from '../../utils';
import { Store } from '@ngrx/store';
import {
  selectCatsItems,
  selectCatsLoading,
  selectDogsItems,
  selectDogsLoading,
} from '../state/selectors/animals.selectors';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgOptimizedImage,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  providers: [NgbModalConfig, NgbModal, ToastrService],
})
export class AnimalsComponent implements OnInit {
  constructor(
    public userService: UserService,
    public animalService: AnimalService,
    public router: Router,
    public toastrService: ToastrService,
    public modalService: NgbModal,
    private store: Store<any>
  ) {}
  open(content: any) {
    if (content) {
      this.modalService.open(content);
    }
  }

  loadingDogs$ = new Observable<boolean>();
  loadingCats$ = new Observable<boolean>();
  dogs$: Observable<Dog[]> = new Observable();
  cats$: Observable<Cat[]> = new Observable();

  ngOnInit(): void {
    this.loadingDogs$ = this.store.select(selectDogsLoading);
    this.loadingCats$ = this.store.select(selectCatsLoading);
    this.dogs$ = this.store.select(selectDogsItems);
    this.cats$ = this.store.select(selectCatsItems);
  }

  editDog(id: string | undefined) {
    this.router.navigate(['/edit/dog/' + id]);
  }

  editCat(id: string | undefined) {
    this.router.navigate(['/edit/cat/' + id]);
  }

  newAnimal(isDog: boolean) {
    addAnimal(isDog, this.router);
  }

  deleteDog(id: string | undefined) {
    this.animalService.deleteDog(id ? id : '').subscribe(
      data => {
        this.toastrService.success('Animal eliminado correctamente');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCat(id: string | undefined) {
    this.animalService.deleteCat(id ? id : '').subscribe(
      data => {
        this.toastrService.success('Animal eliminado correctamente');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  goToDogs() {
    this.router.navigate(['/dogs']);
  }

  goToCats() {
    this.router.navigate(['/cats']);
  }
}

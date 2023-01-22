import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AnimalService } from '../../services/animals/animal.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Dog } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { addAnimal } from '../../utils';
import { Store } from '@ngrx/store';
import { selectDogsItems } from '../state/selectors/animals.selectors';
import { AppState } from '../state/app.state';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dog-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatDividerModule,
  ],
  templateUrl: './dog-view.component.html',
  styleUrls: ['./dog-view.component.scss'],
  providers: [NgbModalConfig, NgbModal, ToastrService],
})
export class DogViewComponent implements OnInit {
  constructor(
    public userService: UserService,
    public animalService: AnimalService,
    public router: Router,
    public toastrService: ToastrService,
    public modalService: NgbModal,
    private store: Store<AppState>
  ) {}

  open(content: any) {
    if (content) {
      this.modalService.open(content, { centered: true });
    }
  }

  dogs$: Observable<Dog[]> = new Observable();

  ngOnInit(): void {
    this.dogs$ = this.store.select(selectDogsItems);
  }

  editDog(id: string | undefined) {
    this.router.navigate(['/edit/dog/' + id]);
  }

  newAnimal(isDog: boolean) {
    addAnimal(isDog, this.router);
  }

  goToAll() {
    this.router.navigate(['/animals']);
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

  goToCats() {
    this.router.navigate(['/cats']);
  }
}

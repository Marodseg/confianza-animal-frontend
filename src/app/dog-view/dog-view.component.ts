import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AnimalService } from '../../services/animals/animal.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Dog } from '../interfaces/interfaces';
import { first, shareReplay } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { addAnimal } from '../../utils';

@Component({
  selector: 'app-dog-view',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, ReactiveFormsModule],
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
    public modalService: NgbModal
  ) {}

  open(content: any) {
    if (content) {
      this.modalService.open(content);
    }
  }

  dogs$ = this.userService.getDogs();
  dogs: Dog[] = [];

  ngOnInit(): void {
    this.dogs$.pipe(first()).subscribe(data => {
      data.forEach(dog => {
        this.dogs.push(dog);
      });
    }, shareReplay());
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AnimalService } from '../../services/animals/animal.service';
import { first, shareReplay } from 'rxjs';
import { Cat, Dog } from '../interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { addAnimal } from '../../utils';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
    public modalService: NgbModal
  ) {}

  open(content: any) {
    if (content) {
      this.modalService.open(content);
    }
  }

  dogs$ = this.userService.getDogs();
  dogs: Dog[] = [];
  cats$ = this.userService.getCats();
  cats: Cat[] = [];

  ngOnInit(): void {
    this.dogs$.pipe(first()).subscribe(data => {
      data.forEach(dog => {
        this.dogs.push(dog);
      });
    }, shareReplay());

    this.cats$.pipe(first()).subscribe(data => {
      data.forEach(cat => {
        this.cats.push(cat);
      });
    }, shareReplay());
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

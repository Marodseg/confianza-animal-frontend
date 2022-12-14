import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AnimalService } from '../../services/animals/animal.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { Cat } from '../interfaces/interfaces';
import { first, shareReplay } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { addAnimal } from '../../utils';

@Component({
  selector: 'app-cat-view',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './cat-view.component.html',
  styleUrls: ['./cat-view.component.scss'],
  providers: [NgbModalConfig, NgbModal, ToastrService],
})
export class CatViewComponent implements OnInit {
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

  cats$ = this.userService.getCats();
  cats: Cat[] = [];

  ngOnInit(): void {
    this.cats$.pipe(first()).subscribe(data => {
      data.forEach(cat => {
        this.cats.push(cat);
      });
    }, shareReplay());
  }

  editCat(id: string | undefined) {
    this.router.navigate(['/edit/cat/' + id]);
  }

  newAnimal(isDog: boolean) {
    addAnimal(isDog, this.router);
  }

  goToAll() {
    this.router.navigate(['/animals']);
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
}

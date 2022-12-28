import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { Cat, Dog, Petition } from '../interfaces/interfaces';
import { Router, RouterModule } from '@angular/router';
import { FilterService } from '../../services/filter/filter.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-petitions',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgOptimizedImage],
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
    private modalService: NgbModal
  ) {}

  open(content: any) {
    if (content) {
      this.modalService.open(content);
    }
  }

  petitions$ = this.userService.getPetitions();
  petitions: Petition[] = [];
  dogRaze: string[] = [];
  catRaze: string[] = [];

  ngOnInit() {
    this.petitions$.subscribe(data => {
      this.petitions = data;
    });
    this.filterService.getDogRazes().subscribe(data => {
      this.dogRaze = data;
    });
    this.filterService.getCatRazes().subscribe(data => {
      this.catRaze = data;
    });
  }

  editAnimal(animal: Dog | Cat) {
    if (this.dogRaze.includes(animal.raze)) {
      this.router.navigate(['edit/dog/' + animal.id]);
    } else {
      this.router.navigate(['edit/cat/' + animal.id]);
    }
  }

  deletePetition(id: string) {
    this.userService.deletePetition(id).subscribe(
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

  acceptPetition(id: string) {
    this.userService.acceptPetition(id).subscribe(
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
}

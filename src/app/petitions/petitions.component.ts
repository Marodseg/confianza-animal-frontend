import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-petitions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.scss'],
})
export class PetitionsComponent {
  constructor() {}
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionsComponent } from './petitions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';

describe('PetitionsComponent', () => {
  let component: PetitionsComponent;
  let fixture: ComponentFixture<PetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PetitionsComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

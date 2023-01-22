import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogProfileComponent } from './dog-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';

describe('DogProfileComponent', () => {
  let component: DogProfileComponent;
  let fixture: ComponentFixture<DogProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DogProfileComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

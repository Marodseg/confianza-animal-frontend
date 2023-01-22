import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogViewComponent } from './dog-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';

describe('DogViewComponent', () => {
  let component: DogViewComponent;
  let fixture: ComponentFixture<DogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DogViewComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

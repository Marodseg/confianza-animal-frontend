import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnimalComponent } from './new-animal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('NewAnimalComponent', () => {
  let component: NewAnimalComponent;
  let fixture: ComponentFixture<NewAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewAnimalComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

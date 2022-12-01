import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogViewComponent } from './dog-view.component';

describe('DogViewComponent', () => {
  let component: DogViewComponent;
  let fixture: ComponentFixture<DogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

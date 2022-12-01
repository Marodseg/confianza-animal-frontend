import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatViewComponent } from './cat-view.component';

describe('CatViewComponent', () => {
  let component: CatViewComponent;
  let fixture: ComponentFixture<CatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

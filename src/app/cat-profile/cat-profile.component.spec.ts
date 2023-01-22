import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatProfileComponent } from './cat-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';

describe('CatProfileComponent', () => {
  let component: CatProfileComponent;
  let fixture: ComponentFixture<CatProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CatProfileComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

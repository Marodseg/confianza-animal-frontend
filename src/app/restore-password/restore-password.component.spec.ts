import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordComponent } from './restore-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('RestorePasswordComponent', () => {
  let component: RestorePasswordComponent;
  let fixture: ComponentFixture<RestorePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RestorePasswordComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [JwtHelperService],
    }).compileComponents();

    fixture = TestBed.createComponent(RestorePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

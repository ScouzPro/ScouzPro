import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegComponent } from './auth-reg.component';

describe('AuthRegComponent', () => {
  let component: AuthRegComponent;
  let fixture: ComponentFixture<AuthRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

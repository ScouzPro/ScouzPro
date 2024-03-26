import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSecondary2Component } from './header-secondary2.component';

describe('HeaderSecondary2Component', () => {
  let component: HeaderSecondary2Component;
  let fixture: ComponentFixture<HeaderSecondary2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSecondary2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderSecondary2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewReportComponent } from './modal-new-report.component';

describe('ModalNewReportComponent', () => {
  let component: ModalNewReportComponent;
  let fixture: ComponentFixture<ModalNewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

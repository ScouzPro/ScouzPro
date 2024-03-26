import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPhisicalComponent } from './graph-phisical.component';

describe('GraphPhisicalComponent', () => {
  let component: GraphPhisicalComponent;
  let fixture: ComponentFixture<GraphPhisicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphPhisicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphPhisicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPrincipalComponent } from './graph-principal.component';

describe('GraphPrincipalComponent', () => {
  let component: GraphPrincipalComponent;
  let fixture: ComponentFixture<GraphPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

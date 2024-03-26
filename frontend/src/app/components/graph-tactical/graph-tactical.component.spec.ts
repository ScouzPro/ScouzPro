import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:frontend/src/app/components/total-graphics/total-graphics.component.spec.ts
import { TotalGraphicsComponent } from './total-graphics.component';

describe('TotalGraphicsComponent', () => {
  let component: TotalGraphicsComponent;
  let fixture: ComponentFixture<TotalGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalGraphicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalGraphicsComponent);
========
import { GraphTacticalComponent } from './graph-tactical.component';

describe('GraphTacticalComponent', () => {
  let component: GraphTacticalComponent;
  let fixture: ComponentFixture<GraphTacticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphTacticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphTacticalComponent);
>>>>>>>> origin/graph:frontend/src/app/components/graph-tactical/graph-tactical.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonPlayerComponent } from './season-player.component';

describe('SeasonPlayerComponent', () => {
  let component: SeasonPlayerComponent;
  let fixture: ComponentFixture<SeasonPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeasonPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

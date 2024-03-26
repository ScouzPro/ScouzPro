import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNewPlayerComponent } from './modal-new-player.component';

describe('ModalNewPLayerComponent', () => {
  let component: ModalNewPlayerComponent;
  let fixture: ComponentFixture<ModalNewPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNewPlayerComponent } from '../../components/modal-new-player/modal-new-player.component';
import { PlayersComponent } from './players.component';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersComponent, ModalNewPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

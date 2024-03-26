import { Component } from '@angular/core';
import { PlayerServiceService } from '../../service/player-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-new-player',
  templateUrl: './modal-new-player.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./modal-new-player.component.css']
})
export class ModalNewPlayerComponent {

  modalPlayerCreated: boolean = false;
  constructor(private playerService: PlayerServiceService) { }


  showModal() {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      setTimeout(() => {
        this.reloadPageAfterDelay();
      }, 4000); // Espera 3 segundos antes de recargar la página
    }
  }

  openCreatePlayer() {
    this.modalPlayerCreated = true;
  }

  async submitForm(form: any) {
    if (form.valid) {
      const newPlayer = form.value;
      await this.playerService.CreatePlayer(newPlayer);
      this.openCreatePlayer();
    }
  }

  closeModal() {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  reloadPageAfterDelay() {
    // Recargar la página después de 3 segundos
    location.reload();
  }
}

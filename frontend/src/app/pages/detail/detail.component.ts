import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceService } from '../../service/player-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { SeasonPlayerComponent } from "../../components/season-player/season-player.component";
import { TotalGraphicsComponent } from "../../components/total-graphics/total-graphics.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [NavbarComponent,  CommonModule, FormsModule,SeasonPlayerComponent, TotalGraphicsComponent, FooterComponent]
})
export class DetailComponent implements OnInit {
  player: any;
  editedPlayer: any = {}; // Variable para almacenar los datos del jugador que se editarán
  modalOpened: boolean = false;
  successModalOpen: boolean  = false;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerServiceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const playerId = params['id'];
      console.log('playerId:', playerId);
      this.loadPlayerDetails(playerId);
    });
  }

  async loadPlayerDetails(playerId: string) {
    try {
      const response = await this.playerService.getPlayerById(playerId);
      if (response && response.length > 0) {
        const playerData = response[0];
        this.player = {
          name: playerData.name,
          actualTeam: playerData.actualTeam,
          age: playerData.age,
          id: playerData._id,
          photo: playerData.photo,
          weight: playerData.weight,
          nationality: playerData.nationality,
          height: playerData.height,
          dorsal: playerData.dorsal,
          strongFoot: playerData.strongFoot
        };
        this.editedPlayer = { ...this.player }; // Inicializa editedPlayer con los datos del jugador actual
        console.log('Datos del jugador cargados:', this.player);
       
      } else {
        console.error('No se encontraron datos para el jugador con ID:', playerId);
      }
    } catch (error) {
      console.error('Error al cargar los detalles del jugador:', error);
    }
  }
  openSuccesModal() {
    this.successModalOpen = true ;
  }
  async updatePlayerData() {
    try {
      const playerId = this.player.id;
      const success = await this.playerService.updatePlayer(playerId, this.editedPlayer);
      if (success) {
        console.log('¡Los datos del jugador se actualizaron correctamente!', this.editedPlayer);
        this.openSuccesModal()
        this.closeModal()
      } else {
        console.error('¡Error al actualizar los datos del jugador!');
      }
    } catch (error) {
      console.error('Error al intentar actualizar los datos del jugador:', error);
    }
  }

  // Función para abrir el modal
  openModal() {
    this.modalOpened = true; // Establece la variable modalOpened a true para abrir el modal
  }

  closeModal() {
    this.modalOpened = false; // Establece la variable modalOpened a false para cerrar el modal
  }
}


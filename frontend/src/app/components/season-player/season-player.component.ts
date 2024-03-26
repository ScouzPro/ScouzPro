import { Component, OnInit,Input } from '@angular/core';
import { SeasonService } from '../../service/season-service.service'; 
import { CommonModule } from '@angular/common';// Asegúrate de importar el servicio SeasonServic
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-season-player',
  standalone: true,
  templateUrl: './season-player.component.html',
  styleUrls: ['./season-player.component.css'],
  imports: [CommonModule, FormsModule ]
})
export class SeasonPlayerComponent implements OnInit {
  @Input() playerId: string = '';// Variable para almacenar el ID del jugador
  
  seasonData: any = {}; // Variable para almacenar los datos de temporada
  editedSeason: any = {};
  showEditModal: boolean = false;

  constructor(private seasonService: SeasonService) { }

  openEditModal() {
    console.log('Modal abierto');
    this.showEditModal = true;
    }

    closeEditModal() {
    // Cerrar el modal de edición
    this.showEditModal = false;
    }
  ngOnInit(): void {
    // Llamar al método para obtener los datos de temporada cuando el componente se inicializa
    this.getSeasonValues();
  }

  async getSeasonValues(): Promise<void> {
    try {
      // Llamar al servicio para obtener los datos de temporada
      const response = await this.seasonService.getSeasonValues(this.playerId);
      this.seasonData = response;
      console.log('Objeto para la tabla season',this.seasonData);
      this.editedSeason = {...this.seasonData}
     
    } catch (error) {
      console.error('Error fetching season data:', error);
     
    }
    
  }
  
  
  async updateSeason(): Promise<void> {
    try {
      // Llamar al servicio para actualizar los datos de la temporada
      const playerId=this.seasonData.player_id;
       await this.seasonService.updateSeasonPlayer(playerId, this.editedSeason);    
       console.log('datos season actualizados')
    } catch (error) {
      console.error('Error updating season data:', error);
    }
  }
  
}



  



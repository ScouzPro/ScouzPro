import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../service/player-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-new-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-new-report.component.html',
  styleUrl: './modal-new-report.component.css'
})
export class ModalNewReportComponent implements OnInit {
  players: any[]  = [];
  isModalOpen: boolean = false;
  
  constructor(private playerService: PlayerServiceService, private router: Router) {}

  ngOnInit(): void {
      this.getPlayerData();
  }

  async getPlayerData(){
    this.players = await this.playerService.getPlayerFollowed();
    console.log('Players:', this.players);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  goToReport(playerId: string) {
    if (playerId) {
      this.router.navigate(['/players', playerId]);
    } else {
      console.error('Player ID is undefined or null');
    }
  }
}

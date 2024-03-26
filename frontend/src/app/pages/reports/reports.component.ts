import { Component, OnInit } from '@angular/core';
import { HeaderSecondary2Component } from '../../components/header-secondary2/header-secondary2.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { PlayerServiceService } from '../../service/player-service.service';
import { MetricsService } from '../../service/metrics.service';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css',
    imports: [HeaderSecondary2Component, NavbarComponent, FooterComponent, CommonModule,]
})
export class ReportsComponent implements OnInit {

    players: any[] = [];
    playerMetricsMap: Map<string, any[]> = new Map<string, any[]>(); // Mapa para almacenar las métricas de cada jugador
    nuevasMetricas: any;
    confirmModal: boolean = false ;
    playerToDelete: any;
    metricToDelete: any;
    constructor(private playerService: PlayerServiceService, private playerMetricService: MetricsService) { }
  
    ngOnInit(): void {
      this.loadPlayers();
    }
  
    async loadPlayers() {
      try {
        this.players = await this.playerService.getPlayerFollowed();
        for (const player of this.players) {
          const metrics = await this.playerMetricService.getPlayerMetrics(player.id);
          this.playerMetricsMap.set(player.id, metrics);
          console.log(metrics);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    getPlayerMetrics(playerId: string): any[] {
      return this.playerMetricsMap.get(playerId) || [];
    }

    openConfirmModal(player: any, metric: any) {
      this.playerToDelete = player;
      this.metricToDelete = metric;
      this.confirmModal = true;
    }
    
    formatCreatedAt(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Agrega un 0 al principio si el mes es de un solo dígito
        const day = date.getDate().toString().padStart(2, '0'); // Agrega un 0 al principio si el día es de un solo dígito
        return `${year}-${month}-${day}`;
      }
      async eliminarMetricas(playerId: string, informeId: string) {
        try {
          // Obtener las métricas correspondientes al jugador
          const metrics = this.playerMetricsMap.get(playerId);
          if (metrics && metrics.length > 0) {
            // Encuentra la métrica que corresponde al informe
            const metric = metrics.find(metric => metric.informeId === informeId);
            if (metric) {
              const metricId = metric._id;
              // Llama al servicio para eliminar la métrica utilizando el _id de las métricas
              await this.playerMetricService.deletePlayerMetrics(metricId);
              console.log('Id para borrar:', metricId);
              // Vuelve a cargar los jugadores sin las métricas eliminadas
              await this.loadPlayers();
              this.confirmModal = false;
            } else {
              console.log('No se encontró la métrica correspondiente al informe.');
            }
          } else {
            console.log('No se encontraron métricas para el jugador.');
          }
        } catch (error) {
          console.error('Error al eliminar métricas:', error);
        }
      }
  }
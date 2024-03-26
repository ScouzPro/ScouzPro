import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../service/player-service.service';
import { MetricsService } from '../../service/metrics.service';
import { CommonModule } from '@angular/common';
import { Chart} from 'chart.js/auto';

@Component({
  selector: 'app-graph-tactical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-tactical.component.html',
  styleUrl: './graph-tactical.component.css'
})
export class GraphTacticalComponent implements OnInit {

  public chart: Chart={} as Chart;
  public playerMetricsMap: Map<string, any> = new Map<string, any>(); // Mapa para almacenar las métricas de los jugadores

  constructor(private playerService: PlayerServiceService, private playerMetricService: MetricsService) {}

  async ngOnInit() {
    await this.loadPlayers();
    this.generateChart();
  }

  async loadPlayers() {
    try {
      const players = await this.playerService.getPlayerFollowed();
      for (const player of players) {
        const metrics = await this.playerMetricService.getPlayerMetrics(player.id);
        this.playerMetricsMap.set(player.id, metrics);
        // console.log('a ver que me trae',metrics);
        
      }
    } catch (error) {
      console.error(error);
    }
  }

  generateChart(): void {
    // Obtener datos para el gráfico
    const labels = ['Anticipación', 'Colocación', 'Concentración', 'Fuerza Fisica', 'Superposición', 'Sin Balon', 'Posicionamiento', 'Visión De Juego'];
    const datasets: any[] = [];
  
    // Obtener la lista de jugadores
    this.playerService.getPlayerFollowed().then(players => {
      // Recorrer las métricas de los jugadores
      this.playerMetricsMap.forEach((metrics, playerId) => {
        // Encontrar el jugador correspondiente en la lista de jugadores
        const player = players.find((player:any) => player.id === playerId);
        const playerName = player ? player.name : 'Nombre Desconocido';
  
        // Obtener los valores de averageTotalSkills
          const anticipation = metrics.map((metric: any) => metric.tacticalSkills[0].anticipation);
          const placement = metrics.map((metric: any) => metric.tacticalSkills[0].placement)
          const concentration = metrics.map((metric: any) => metric.tacticalSkills[0].concentration)
          const forcefulness = metrics.map((metric: any) => metric.tacticalSkills[0].forcefulness)
          const overlap = metrics.map((metric: any) => metric.tacticalSkills[0].overlap)
          const offTheBall = metrics.map((metric: any) => metric.tacticalSkills[0].offTheBall)
          const positioning = metrics.map((metric: any) => metric.tacticalSkills[0].positioning)
          const gameVision = metrics.map((metric: any) => metric.tacticalSkills[0].gameVision)

        const data = {
          anticipation: anticipation,
          placement: placement,
          concentration: concentration,
          forcefulness: forcefulness,
          overlap: overlap,
          offTheBall: offTheBall,
          positioning: positioning,
          gameVision : gameVision
        };
        
        console.log(data);
  
        datasets.push({
          label: playerName,
          data: [Math.max(...data.anticipation), Math.max(...data.placement), Math.max(...data.concentration),Math.max(...data.forcefulness),Math.max(...data.overlap),Math.max(...data.offTheBall),Math.max(...data.positioning),Math.max(...data.gameVision)],
          fill: true,
          pointBackgroundColor: this.getRandomColor(),
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: this.getRandomColor()
        });
        
      });
  
      // Configurar el objeto de datos del gráfico
      const data = {
        labels: labels,
        datasets: datasets
      };

      const options = {
        scale: {
            min: 0,
            max: 10,
            ticks: {
                stepSize: 1
            }
        },
        elements: {
            line: {
                borderWidth: 3
            }
        },
        plugins: {
            legend: {
                labels: {
                    // Configura el tamaño de la fuente de las etiquetas de la leyenda
                    font: {
                        size: 7 // Ajusta este valor según tus necesidades
                    }
                }
            }
        }
    };
  
      // Crear el gráfico
      this.chart = new Chart("myChart2", {
        type: 'radar',
        data: data,
        options: options
      });
    }).catch(error => {
      console.error('Error al obtener la lista de jugadores:', error);
    });
  }

  // Método para generar un color aleatorio para los bordes del gráfico
  getRandomColor(): string {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;}}

import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../service/player-service.service';
import { MetricsService } from '../../service/metrics.service';
import { CommonModule } from '@angular/common';
import { Chart} from 'chart.js/auto';

@Component({
  selector: 'app-graph-phisical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-phisical.component.html',
  styleUrl: './graph-phisical.component.css'
})
export class GraphPhisicalComponent implements OnInit {

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
    const labels = ['Agilidad', 'Flexibilidad', 'Fuerza', 'Poder', 'Resistencia', 'Salto', 'Velocidad' ];
    const datasets: any[] = [];
  
    // Obtener la lista de jugadores
    this.playerService.getPlayerFollowed().then(players => {
      // Recorrer las métricas de los jugadores
      this.playerMetricsMap.forEach((metrics, playerId) => {
        // Encontrar el jugador correspondiente en la lista de jugadores
        const player = players.find((player:any) => player.id === playerId);
        const playerName = player ? player.name : 'Nombre Desconocido';
  
        // Obtener los valores de averageTotalSkills
          const agility = metrics.map((metric: any) => metric.physicalSkills[0].agility);
          const flexibility = metrics.map((metric: any) => metric.physicalSkills[0].flexibility)
          const strength = metrics.map((metric: any) => metric.physicalSkills[0].strength)
          const power = metrics.map((metric: any) => metric.physicalSkills[0].power)
          const endurance = metrics.map((metric: any) => metric.physicalSkills[0].endurance)
          const jumping = metrics.map((metric: any) => metric.physicalSkills[0].jumping)
          const speed = metrics.map((metric: any) => metric.physicalSkills[0].speed)

        const data = {
          agility: agility,
          flexibility: flexibility,
          strength: strength,
          power: power,
          endurance: endurance,
          jumping: jumping,
          speed: speed
        };
        
        console.log(data);
  
        datasets.push({
          label: playerName,
          data: [Math.max(...data.agility), Math.max(...data.flexibility), Math.max(...data.strength),Math.max(...data.power),Math.max(...data.endurance),Math.max(...data.jumping),Math.max(...data.speed)],
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
      this.chart = new Chart("myChart3", {
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


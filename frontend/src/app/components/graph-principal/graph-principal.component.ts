import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../../service/player-service.service';
import { MetricsService } from '../../service/metrics.service';
import { CommonModule } from '@angular/common';
import { Chart} from 'chart.js/auto';


@Component({
  selector: 'app-graph-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-principal.component.html',
  styleUrl: './graph-principal.component.css'
})
export class GraphPrincipalComponent implements OnInit {

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
    const labels = ['Disparo', 'Cabezazo', 'Asociación', 'Pie Derecho', 'Pie Izquierdo', 'Pase Largo', 'Regate', 'Reflejos', 'Centros' ];
    const datasets: any[] = [];
  
    // Obtener la lista de jugadores
    this.playerService.getPlayerFollowed().then(players => {
      // Recorrer las métricas de los jugadores
      this.playerMetricsMap.forEach((metrics, playerId) => {
        // Encontrar el jugador correspondiente en la lista de jugadores
        const player = players.find((player:any) => player.id === playerId);
        const playerName = player ? player.name : 'Nombre Desconocido';
  
        // Obtener los valores de averageTotalSkills
          const shot = metrics.map((metric: any) => metric.principalSkills[0].shot);
          const heading = metrics.map((metric: any) => metric.principalSkills[0].heading)
          const association = metrics.map((metric: any) => metric.principalSkills[0].association)
          const rightFoot = metrics.map((metric: any) => metric.principalSkills[0].rightFoot)
          const leftFoot = metrics.map((metric: any) => metric.principalSkills[0].leftFoot)
          const longPasses = metrics.map((metric: any) => metric.principalSkills[0].longPasses)
          const dribbling = metrics.map((metric: any) => metric.principalSkills[0].dribbling)
          const reflexes = metrics.map((metric: any) => metric.principalSkills[0].reflexes)
          const crosses = metrics.map((metric: any) => metric.principalSkills[0].crosses)

        const data = {
          shot: shot,
          heading: heading,
          association: association,
          rightFoot: rightFoot,
          leftFoot: leftFoot,
          longPasses: longPasses,
          dribbling: dribbling,
          reflexes : reflexes,
          crosses : crosses
        };
        
        console.log(data);
  
        datasets.push({
          label: playerName,
          data: [Math.max(...data.shot), Math.max(...data.heading), Math.max(...data.association),Math.max(...data.rightFoot),Math.max(...data.leftFoot),Math.max(...data.longPasses),Math.max(...data.dribbling),Math.max(...data.reflexes),Math.max(...data.crosses)],
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
      this.chart = new Chart("myChart", {
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

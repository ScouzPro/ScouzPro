import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MetricsService } from '../../service/metrics.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-total-graphics',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './total-graphics.component.html',
  styleUrl: './total-graphics.component.css'
})
export class TotalGraphicsComponent implements OnInit {
  @Input() playerId: string = '';
  @ViewChild('donutChart') donutChart!: ElementRef;
  @ViewChild('secondChart') secondChart!: ElementRef;
  @ViewChild('thirdChart') thirdChart!: ElementRef;
  public chart: Chart<'bar', number[], string> | null = null;
  playerMetrics: any[] = [];
  selectedMetric: string ='';
  
  
  

  constructor(private playerMetricService: MetricsService,) {}
 
  async ngOnInit(){
      await this.getPlayerMetrics();
      this.generateChart.bind(this);
      
    }
    async getPlayerMetrics () {
     
      try {
          this.playerMetrics = await this.playerMetricService.getPlayerMetricsById(this.playerId);
          console.log('playerMetrics', this.playerMetrics);
          if (this.playerMetrics.length > 0) {
              this.selectedMetric = this.playerMetrics[0]._id;
              this.generateChart(); // Llamar a generateChart() aquí
          }
          
      } catch (error) {
          // Manejar el error aquí si es necesario
      }
  } 


async generateChart() {
  
  try { 
       if (this.chart) {
          this.chart.destroy();
      }
      // await this.principalSkillChart();
      // await this.tacticalSkillGraphics();
      await this.physicalSkillGraphics();
  } catch (error) {
      console.error('Error al generar el gráfico:', error);
  }
}
    // async principalSkillChart() {
    //   try {
      
    //     const selectedMetric = this.playerMetrics.find(metric => metric._id === this.selectedMetric);
    //     if (!selectedMetric) {
    //       console.error('No se encontró la métrica seleccionada.');
    //       return;
    //     }
  
    //     // Verificar cambio de _id antes de destruir
       
  
    //     const skillsData = [
    //       selectedMetric.principalSkills[0].shot,
    //       selectedMetric.principalSkills[0].association,
    //       selectedMetric.principalSkills[0].heading,
    //       selectedMetric.principalSkills[0].dribbling
    //     ];
  
    //     const data = {
    //       labels: ['Disparo', 'Asociarse', 'Cabeza', 'Regate'],
    //       datasets: [{
    //         label: 'Detalles',
    //         data: skillsData,
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(255, 159, 64, 0.2)',
    //           'rgba(255, 205, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)'
    //         ],
    //         borderColor: [
    //           'rgb(255, 99, 132)',
    //           'rgb(255, 159, 64)',
    //           'rgb(255, 205, 86)',
    //           'rgb(75, 192, 192)'
    //         ],
    //         borderWidth: 1
    //       }],
    //       hoverOffset: 5
    //     };
  
    //     this.chart = new Chart(this.donutChart.nativeElement, {
    //       type: 'bar',
    //       data: data,
    //       options: {
    //         responsive: true,
    //         plugins: {
    //           legend: {
    //             position: 'top'
    //           }
    //         }
    //       }
    //     });
  
    //   } catch (error) {
    //     console.error('Error al generar el gráfico:', error);
    //   }
    // }
    

  //   async tacticalSkillGraphics() {
  //     try {
       
  //         const selectedMetric = this.playerMetrics.find(metric => metric._id === this.selectedMetric);
  //         console.log('el id para tacticalgraphics', selectedMetric)
  //         if (!selectedMetric) {
  //             console.error('No se encontró la métrica seleccionada.');
  //             return;
  //         }
         
  //         const tacticalSkillsData = [
  //             selectedMetric.tacticalSkills[0].anticipation,
  //             selectedMetric.tacticalSkills[0].concentration,
  //             selectedMetric.tacticalSkills[0].gameVision,
  //             selectedMetric.tacticalSkills[0].positioning,
  //         ];
  
  //         const data = {
  //             labels: ['Anticipacion', 'Concentracion', 'Vision de juego', 'Posicionamiento'],
  //             datasets: [{
  //                 label: 'Detalles Tácticos',
  //                 data: tacticalSkillsData,
  //                 backgroundColor: [
  //                     'rgba(54, 162, 235, 0.2)',
  //                     'rgba(255, 206, 86, 0.2)',
  //                     'rgba(75, 192, 192, 0.2)',
  //                     'rgba(153, 102, 255, 0.2)'
  //                 ],
  //                 borderColor: [
  //                     'rgba(54, 162, 235, 1)',
  //                     'rgba(255, 206, 86, 1)',
  //                     'rgba(75, 192, 192, 1)',
  //                     'rgba(153, 102, 255, 1)'
  //                 ],
  //                 borderWidth: 1
  //             }],
  //             hoverOffset: 5
  //         };
  
  //         this.chart = new Chart(this.secondChart.nativeElement, {
  //             type: 'bar',
  //             data: data,
  //             options: {
  //                 responsive: true,
  //                 plugins: {
  //                     legend: {
  //                         position: 'top'
  //                     }
  //                 },
  //             }
  //         });
  
  //     } catch (error) {
  //         console.error('Error al generar el gráfico de habilidades tácticas:', error);
  //     }
  // }
  

    async physicalSkillGraphics() {
      try {
        // Aquí obtienes los datos de las habilidades físicas y generas el gráfico
        const selectedMetric = this.playerMetrics.find(metric => metric._id === this.selectedMetric);
        if (!selectedMetric) {
          console.error('No se encontró la métrica seleccionada.');
          return;
        }
        
  
        const physicalSkillsData = [
          selectedMetric.physicalSkills[0].agility,
          selectedMetric.physicalSkills[0].endurance,
          selectedMetric.physicalSkills[0].speed,
          selectedMetric.physicalSkills[0].strength
        ];
  
        const data = {
          labels: ['Agilidad', 'Resistencia', 'Velocidad', 'Fuerza '],
          datasets: [{
            label: 'Detalles Físicos',
            data: physicalSkillsData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 2
          }],
          hoverOffset: 5
        };

       
  
        this.chart = new Chart(this.thirdChart.nativeElement, {
          type: 'bar',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              }
            },
          }
        });
  
      } catch (error) {
        console.error('Error al generar el gráfico de habilidades tácticas:', error);
      }
    }
}

  

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { PlayerServiceService } from '../../service/player-service.service';
import { MetricsService } from '../../service/metrics.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-new-report',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {
  playerId: string;
  player: any[] = [];  
  metrics: any[];
  averageTotalSkills:number
  shot: number;
  heading: number;
  association: number;
  rightFoot: number;
  leftFoot: number;
  longPasses: number;
  dribbling: number;
  reflexes: number;
  crosses: number;
  totalPrincipalSkills: number;
  anticipation: number;
  placement: number;
  concentration: number;
  forcefulness: number;
  overlap: number;
  offTheBall: number;
  positioning: number;
  gameVision: number;
  agility: number;
  flexibility: number;
  strength: number;
  power: number;
  endurance: number;
  jumping: number;
  speed: number;
  totalTacticalSkills: number;
  totalPhysicalSkills: number;
  matchSummary: string;
  modalOpen: boolean = false;
  

  constructor(private route: ActivatedRoute, private playerService: PlayerServiceService, private metricsService: MetricsService, private router: Router) {
    this.playerId = '';
    this.metrics = [];
    this.averageTotalSkills=0;
    this.shot = 0;
    this.heading = 0;
    this.association = 0;
    this.rightFoot = 0;
    this.leftFoot = 0;
    this.longPasses = 0;
    this.dribbling = 0;
    this.reflexes = 0;
    this.crosses = 0;
    this.totalPrincipalSkills = NaN;
    this.anticipation = 0;
    this.placement = 0;
    this.concentration = 0;
    this.forcefulness = 0;
    this.overlap = 0;
    this.offTheBall = 0;
    this.positioning = 0;
    this.gameVision = 0;
    this.agility = 0;
    this.flexibility = 0;
    this.strength = 0;
    this.power = 0;
    this.endurance = 0;
    this.jumping = 0;
    this.speed = 0;
    this.totalTacticalSkills = NaN;
    this.totalPhysicalSkills = NaN;
    this.matchSummary='';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerId = params['id'];
    });

    this.getPlayerDetails();
    // Setup event listeners after loading metrics
  }

  async getPlayerDetails() {
    try {
      this.player = await this.playerService.getPlayerById(this.playerId);
      console.log(this.player);
    } catch (error) {
      console.error(error);
    }
  }

  async submitForm() {
    const formData = {
      player_id: this.playerId,
      averageTotalSkills: this.averageTotalSkills,
      principalSkills: {
        shot: this.shot,
        heading: this.heading,
        association: this.association,
        rightFoot: this.rightFoot,
        leftFoot: this.leftFoot,
        longPasses: this.longPasses,
        dribbling: this.dribbling,
        reflexes: this.reflexes,
        crosses: this.crosses,
        totalPrincipalSkills: this.totalPrincipalSkills,
      },
      tacticalSkills: [{
        anticipation: this.anticipation,
        placement: this.placement,
        concentration: this.concentration,
        forcefulness: this.forcefulness,
        overlap: this.overlap,
        offTheBall: this.offTheBall,
        positioning: this.positioning,
        gameVision: this.gameVision,
        totalTacticalSkills: this.totalTacticalSkills,
      }],
      physicalSkills: [{
        agility: this.agility,
        flexibility: this.flexibility,
        strength: this.strength,
        power: this.power,
        endurance: this.endurance,
        jumping: this.jumping,
        speed: this.speed,
        totalPhysicalSkills: this.totalPhysicalSkills,
      }],
      matchSummary: this.matchSummary,
    };
  
    try {
      const response = await this.metricsService.submitMetrics(formData);
      if (response) {
        console.log('Formulario enviado correctamente:');
        this.openModal();
        console.log('Formulario enviado correctamente:');
        this.openModal();
      } else {
        console.error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  }


  openModal() { 
          this.modalOpen = true;
      console.log('esto abre ?')
      
    
  }

  closeModal() {
      this.modalOpen= false;
      this.router.navigateByUrl('/reports');
    

  }

  calculateTotal() {
    // Calcula la suma de los valores ingresados para las habilidades principales
    let totalPrincipal = 0;
    let countPrincipal = 0;
    const principalValues = [this.shot, this.heading, this.association, this.rightFoot, this.leftFoot, this.longPasses, this.dribbling, this.reflexes, this.crosses];
    for (const value of principalValues) {
      if (!isNaN(value)) {
        totalPrincipal += value;
        countPrincipal++;
      }
    }
    this.totalPrincipalSkills = countPrincipal > 0 ? totalPrincipal / countPrincipal : NaN;
    this.totalPrincipalSkills = +this.totalPrincipalSkills.toFixed(1);

    // Calcula la suma de los valores ingresados para las habilidades tácticas
    let totalTactical = 0;
    let countTactical = 0;
    const tacticalValues = [this.anticipation, this.placement, this.concentration, this.forcefulness, this.overlap, this.offTheBall, this.positioning, this.gameVision];
    for (const value of tacticalValues) {
      if (!isNaN(value)) {
        totalTactical += value;
        countTactical++;
      }
    }
    this.totalTacticalSkills = countTactical > 0 ? totalTactical / countTactical : NaN;
    this.totalTacticalSkills = +this.totalTacticalSkills.toFixed(1);

    // Calcula la suma de los valores ingresados para las habilidades físicas
    let totalPhysical = 0;
    let countPhysical = 0;
    const physicalValues = [this.agility, this.flexibility, this.strength, this.power, this.endurance, this.jumping, this.speed];
    for (const value of physicalValues) {
      if (!isNaN(value)) {
        totalPhysical += value;
        countPhysical++;
      }
    }
    this.totalPhysicalSkills = countPhysical > 0 ? totalPhysical / countPhysical : NaN;
    this.totalPhysicalSkills = +this.totalPhysicalSkills.toFixed(1);


    const totalSkills = [this.totalPrincipalSkills, this.totalTacticalSkills, this.totalPhysicalSkills];
    const filteredSkills = totalSkills.filter(skill => !isNaN(skill));
    const totalAverage = filteredSkills.length > 0 ? filteredSkills.reduce((acc, cur) => acc + cur, 0) / filteredSkills.length : NaN;
    this.averageTotalSkills = +totalAverage.toFixed(1);
}

}
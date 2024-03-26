import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphTacticalComponent } from '../../components/graph-tactical/graph-tactical.component';
import { GraphPhisicalComponent } from '../../components/graph-physical/graph-phisical.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GraphPrincipalComponent } from '../../components/graph-principal/graph-principal.component';


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, GraphTacticalComponent, GraphPhisicalComponent, NavbarComponent, FooterComponent, GraphPrincipalComponent],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-detail',
  templateUrl: './header-detail.component.html',
  styleUrls: ['./header-detail.component.css']
})
export class HeaderDetailComponent {
  @Input() player: any; // Recibir los datos del jugador como entrada
}


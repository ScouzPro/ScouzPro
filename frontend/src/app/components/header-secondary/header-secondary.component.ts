import { Component } from '@angular/core';
import { ModalNewPlayerComponent } from '../modal-new-player/modal-new-player.component';
import { ModalNewReportComponent } from '../modal-new-report/modal-new-report.component';

@Component({
  selector: 'app-header-secondary',
  standalone: true,
  imports: [ModalNewPlayerComponent, ModalNewReportComponent],
  templateUrl: './header-secondary.component.html',
  styleUrl: './header-secondary.component.css'
})
export class HeaderSecondaryComponent {

}

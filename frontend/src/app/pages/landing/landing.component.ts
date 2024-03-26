import { Component } from '@angular/core';
import { HeroLandingComponent } from '../../components/hero-landing/hero-landing.component';
// import { LoginFormComponent } from '../../components/login-form/login-form.component';
// import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroLandingComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  
}


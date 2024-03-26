import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FooterComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  formUser = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
  });
  showAlert= false;
  alertMessage: string = '';
  AlertMessage = false

  constructor(private router: Router, private userService: UsersService) {}

  navigateToHeroLanding() {
      this.router.navigate([""]);
  }

  navigateToAuthRegister() {
      this.router.navigate(["/register"])
  }

  navigateToHome() {
      this.router.navigate(["/home"])
  }

  // Custom function to check all fields have a value, correct or not
  areAllFieldsFilled(): boolean {
      const formValues = this.formUser.value as { [key: string]: string | null };
      for (const key in formValues) {
          if (formValues.hasOwnProperty(key)) {
              const value: string | null = formValues[key]; 
              if (!value) {
                  return false; 
              }
          }
      }
      return true; 
  }
showTermsError = false; 


onSubmit() {
    if (this.formUser.valid) {
        const credentials = {
            username: this.formUser.value.username,
            password: this.formUser.value.password
        };

        this.userService.loginUser(credentials).subscribe(
            (response) => {
                console.log('Login con éxito:', response);
                localStorage.setItem('token de admin',response.tokenLog)
                this.alertMessage = '¡Bienvenido, ' + credentials.username + '!';
                this.AlertMessage = true;
                setTimeout(() => {
                    this.navigateToHome();
                }, 2000);
            },
            (error) => {
                console.error('Error al logear:', error);
                this.alertMessage = 'Error en usuario/contraseña';
                this.AlertMessage = true; // Mostrar la alerta
                this.showAlert = true;

                // Ocultar la alerta después de 3 segundos
                setTimeout(() => {
                    this.AlertMessage = false;
                }, 2000);
            }
        );
    } else {
        this.alertMessage = 'Por favor, complete todos los campos correctamente.';
        this.AlertMessage = true; // Mostrar la alerta
        this.showAlert = true;
        setTimeout(() => {
            this.AlertMessage = false;
        }, 2000);
    }
}


  }
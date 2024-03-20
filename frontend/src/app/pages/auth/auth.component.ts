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
        'userName': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required])
    });

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

  
    onSubmit() {
        if (this.formUser.valid) {
          const credentials = {
            userName: this.formUser.value.userName,
            password: this.formUser.value.password
          };
          console.log(credentials);
          
          this.userService.loginUser(credentials).subscribe(
            (response) => {
              console.log('Login con éxito:', response);
              setTimeout(() => {
                this.navigateToHome();
              }, 2000); 
            },
            (error) => {
              console.error('Error al logear:', error);
            }
          );
        } else {
          console.log("Formulario no válido");
        }
      }
    }

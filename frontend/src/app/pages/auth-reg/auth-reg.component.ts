import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-auth-reg',
    templateUrl: './auth-reg.component.html',
    standalone: true,
    imports :[FooterComponent, CommonModule, ReactiveFormsModule],
    styleUrls: ['./auth-reg.component.css']
})
export class AuthRegComponent {
    showSuccessMessage = false;
    //VALIDACIONES
    //GETTERS
    get name(){
        return this.formNewUser.get('name') as FormControl; //acceso al grupo, luego a la propiedad get y luego al valor
    }
    get lastName(){
        return this.formNewUser.get('lastName') as FormControl; //acceso al grupo, luego a la propiedad get y luego al valor
    }
    get username(){
        return this.formNewUser.get('username') as FormControl; //acceso al grupo, luego a la propiedad get y luego al valor
    }
    get email(){
        return this.formNewUser.get('email') as FormControl; //acceso al grupo, luego a la propiedad get y luego al valor
    }
    get password(){
        return this.formNewUser.get('password') as FormControl; //acceso al grupo, luego a la propiedad get y luego al valor
    }
    get repeatPassword(){
        return this.formNewUser.get('repeatPassword') as FormControl; //acceso al grupo, luego a la propiedad get y luego al valor
    }
    get terms(){
        return this.formNewUser.get('terms') as FormControl; //acceso al grupo, luego a la propiedad get y luego al valor
    }

    //GRUPO DE CONTROLADORES 
    formNewUser = new FormGroup({ //esto a la cabeza del form
        'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
        'lastName': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
        'username': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
        'repeatPassword': new FormControl('', Validators.required),
        'terms': new FormControl(false) // Add a FormControl for the checkbox
    }, { validators: this.passwordMatchValidator }); // Add custom validator for matching passwords)

    //Constructor para las rutas de navegación de la pagina
    constructor (private userService: UsersService, private router: Router) {}

    navigateToHeroLanding() { //Ruta que vueve a landing al pulsar btn
        this.router.navigate([""]);
    }
    
    navigateToAuth() { //Ruta que navega a login al pulsar btn
        this.router.navigate(["/login"])
    }

    navigateToHome() { //Ruta que navega a home al pulsar btn
        this.router.navigate(["/login"])
    }

    // Custom validator function to check if passwords match
    passwordMatchValidator(control: AbstractControl) { // Change parameter type to AbstractControl
        const password = control.get('password')?.value;
        const repeatPassword = control.get('repeatPassword')?.value;
        
        if (password === repeatPassword) {
            return null; 
        } else {
            return { mismatch: true }; // Passwords don't match, return an error object
        }
    }
// Custom function to check all fields have a value, correct or not
    areAllFieldsFilled(): boolean {
        const formValues = this.formNewUser.value as { [key: string]: string | null };
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
    showTermsError = false; // Variable to track the error message for terms acceptance
   
    onSubmit() {
        if (this.formNewUser.valid && !this.formNewUser.errors?.['mismatch'] && this.formNewUser.get('terms')?.value) {
            // Hide the error message if there's no error
            this.showTermsError = false;
            // Llama al servicio para crear el nuevo usuario
            this.userService.createUser(this.formNewUser.value).subscribe(
                response => {
                    console.log('Usuario creado con éxito:', response);
                    this.showSuccessMessage = true;
                    setTimeout(() => {
                        this.navigateToHome();
                      }, 3000); 
                },
                error => {
                    console.error('Error al crear el usuario:', error);
                }
            );
        } else {
            this.showTermsError = true;
            if (this.formNewUser.hasError('mismatch')) {
                // Handle mismatch error
            }
        }
        
    }

    
}

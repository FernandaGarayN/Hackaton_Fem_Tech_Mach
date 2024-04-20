import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async signin() {
    console.log('intentando ingresar');
    const user = await this.authService.login(this.credentials.value);
    if (user) {
      this.router.navigate(['/home']);
    } else {
      console.log('error al ingresar');
      await this.toastErrorMessage('Correo y/o contraseña inválidos');
    }
  }

  register() {
    console.log('ir a REGISTRO');
    this.router.navigateByUrl('/registro', { replaceUrl: true });
  }

  get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }

  async toastErrorMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle',
      color: 'danger',
    });
    toast.present();
  }

}

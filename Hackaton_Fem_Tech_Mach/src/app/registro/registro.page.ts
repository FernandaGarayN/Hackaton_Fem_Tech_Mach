import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  register!: FormGroup; 
  firestore: Firestore = inject(Firestore);
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}
  
  ngOnInit() {
    this.register = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      rut: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  async registrar() {
    console.log('intentando registar'); 

    const auth = {
      email: this.register.get('email')?.value,
      password: this.register.get('password')?.value
    }

    const user = await this.authService.register(auth);
    
    if (user) {
      const userprofile = {
        email: this.register.get('email')?.value,
        nombre: this.register.get('nombre')?.value,
        apellido: this.register.get('apellido')?.value,
        telefono: this.register.get('telefono')?.value,
        rut: this.register.get('rut')?.value,
      };
      const collectionRef = collection(this.firestore, 'users');
      await addDoc(collectionRef, userprofile);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      console.log('error al registrar');
      await this.toastErrorMessage('El correo que intenta registrar ya existe');
    }
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

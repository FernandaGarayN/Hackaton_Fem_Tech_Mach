import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { OcrService } from '../services/ocr.service'; // Importar el servicio de OCR

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  register!: FormGroup;
  firestore: Firestore = inject(Firestore);
  imageData: string = ''; // Variable para almacenar los datos de la imagen

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private ocrService: OcrService // Inyectar el servicio de OCR
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
      // Verificar si se ha cargado una imagen
      if (this.imageData) {
        try {
          // Usar el servicio de OCR para reconocer el texto en la imagen
          const textoReconocido = await this.ocrService.recognizeImage(this.imageData);

          // Obtener los datos del formulario
          const { nombre, apellido, rut } = this.register.value;

          // Comparar los datos del formulario con el texto reconocido
          if (textoReconocido.includes(nombre) && textoReconocido.includes(apellido) && textoReconocido.includes(rut)) {
            // Los datos coinciden, puedes continuar con el registro
            console.log('Los datos coinciden');
            const userprofile = {
              email: auth.email,
              nombre: nombre,
              apellido: apellido,
              telefono: this.register.get('telefono')?.value,
              rut: rut,
            };
            const collectionRef = collection(this.firestore, 'users');
            await addDoc(collectionRef, userprofile);
            this.router.navigateByUrl('/home', { replaceUrl: true });
          } else {
            // Los datos no coinciden, muestra un mensaje de error
            console.log('Los datos no coinciden');
            await this.toastErrorMessage('Los datos ingresados no coinciden con la imagen del documento de identidad');
          }
        } catch (error) {
          console.error('Error al reconocer texto:', error);
        }
      } else {
        console.log('Debe cargar una imagen del documento de identidad');
        await this.toastErrorMessage('Debe cargar una imagen del documento de identidad');
      }
    } else {
      console.log('error al registrar');
      await this.toastErrorMessage('El correo que intenta registrar ya existe');
    }
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageData = reader.result as string;
    };

    reader.readAsDataURL(file);
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

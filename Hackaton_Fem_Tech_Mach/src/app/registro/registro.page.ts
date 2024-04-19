import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  register!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {}

async registrar() {
  /*console.log('intentando registar');
  const user = await this.authService.register(this.credentials.value);
  if (user) {
    const userprofile = {
      email: this.credentials.get('email')?.value,
    };
    const collectionRef = collection(this.firestore, 'users');
    await addDoc(collectionRef, userprofile);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  } else {
    console.log('error al registrar');
    await this.toastErrorMessage('El correo que intenta registrar ya existe');
  }*/
}
  ngOnInit() {
  }

}

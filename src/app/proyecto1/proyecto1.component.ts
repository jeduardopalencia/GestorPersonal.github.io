import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyecto1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proyecto1.component.html',
  styleUrl: './proyecto1.component.css'
})


export class Proyecto1Component {
  // Proceso de validación
  resultado = '';

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(10)]),
    edad: new FormControl('', [Validators.required, Validators.minLength(1)]),
    DPI: new FormControl('', [Validators.required, Validators.minLength(12)])
  });

  listaPersonas: { nombre: string, edad: string, DPI: string }[] = [];  

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    let datos = localStorage?.getItem("personas");
    if (datos != null) {
      let arreglo = JSON.parse(datos);
      if (arreglo != null) {
        this.listaPersonas = arreglo;
      }
    }
  }

  enviar() {
    if (this.formularioContacto.valid) {
      const nuevaPersona = {
        nombre: this.formularioContacto.value.nombre!,
        edad: this.formularioContacto.value.edad!,
        DPI: this.formularioContacto.value.DPI!
      };
      this.listaPersonas.push(nuevaPersona);
      this.actualizarLocalStorage();
      this.formularioContacto.reset();
      this.resultado = "Todos los datos son válidos.";
    } else {
      this.resultado = "Hay datos inválidos en el formulario.";
    }
  }

  borrarPersonal(index: number) {
    this.listaPersonas.splice(index, 1);
    this.actualizarLocalStorage();
  }

  actualizarLocalStorage() {
    localStorage.setItem("personas", JSON.stringify(this.listaPersonas));
  }
}

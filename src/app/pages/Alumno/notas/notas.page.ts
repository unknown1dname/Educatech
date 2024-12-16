import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  notas = [
    { titulo: 'Nota 1', descripcion: 'Descripción de la nota 1' },
    { titulo: 'Nota 2', descripcion: 'Descripción de la nota 2' },
    { titulo: 'Nota 3', descripcion: 'Descripción de la nota 3' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

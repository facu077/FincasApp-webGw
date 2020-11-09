import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEncargado } from 'app/shared/model/fincasMs/encargado.model';

@Component({
  selector: 'jhi-encargado-detail',
  templateUrl: './encargado-detail.component.html',
})
export class EncargadoDetailComponent implements OnInit {
  encargado: IEncargado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ encargado }) => (this.encargado = encargado));
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampo } from 'app/shared/model/fincasMs/campo.model';

@Component({
  selector: 'jhi-campo-detail',
  templateUrl: './campo-detail.component.html',
})
export class CampoDetailComponent implements OnInit {
  campo: ICampo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ campo }) => (this.campo = campo));
  }

  previousState(): void {
    window.history.back();
  }
}

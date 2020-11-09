import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHerramienta } from 'app/shared/model/fincasMs/herramienta.model';

@Component({
  selector: 'jhi-herramienta-detail',
  templateUrl: './herramienta-detail.component.html',
})
export class HerramientaDetailComponent implements OnInit {
  herramienta: IHerramienta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ herramienta }) => (this.herramienta = herramienta));
  }

  previousState(): void {
    window.history.back();
  }
}

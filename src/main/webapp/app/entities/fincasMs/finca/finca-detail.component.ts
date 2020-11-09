import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFinca } from 'app/shared/model/fincasMs/finca.model';

@Component({
  selector: 'jhi-finca-detail',
  templateUrl: './finca-detail.component.html',
})
export class FincaDetailComponent implements OnInit {
  finca: IFinca | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ finca }) => (this.finca = finca));
  }

  previousState(): void {
    window.history.back();
  }
}

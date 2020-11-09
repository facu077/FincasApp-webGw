import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICosecha } from 'app/shared/model/fincasMs/cosecha.model';

@Component({
  selector: 'jhi-cosecha-detail',
  templateUrl: './cosecha-detail.component.html',
})
export class CosechaDetailComponent implements OnInit {
  cosecha: ICosecha | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cosecha }) => (this.cosecha = cosecha));
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICosecha, Cosecha } from 'app/shared/model/fincasMs/cosecha.model';
import { CosechaService } from './cosecha.service';
import { IFinca } from 'app/shared/model/fincasMs/finca.model';
import { FincaService } from 'app/entities/fincasMs/finca/finca.service';

@Component({
  selector: 'jhi-cosecha-update',
  templateUrl: './cosecha-update.component.html',
})
export class CosechaUpdateComponent implements OnInit {
  isSaving = false;
  fincas: IFinca[] = [];

  editForm = this.fb.group({
    id: [],
    producto: [null, [Validators.required]],
    peso: [null, [Validators.required]],
    finca: [],
  });

  constructor(
    protected cosechaService: CosechaService,
    protected fincaService: FincaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cosecha }) => {
      this.updateForm(cosecha);

      this.fincaService.query().subscribe((res: HttpResponse<IFinca[]>) => (this.fincas = res.body || []));
    });
  }

  updateForm(cosecha: ICosecha): void {
    this.editForm.patchValue({
      id: cosecha.id,
      producto: cosecha.producto,
      peso: cosecha.peso,
      finca: cosecha.finca,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cosecha = this.createFromForm();
    if (cosecha.id !== undefined) {
      this.subscribeToSaveResponse(this.cosechaService.update(cosecha));
    } else {
      this.subscribeToSaveResponse(this.cosechaService.create(cosecha));
    }
  }

  private createFromForm(): ICosecha {
    return {
      ...new Cosecha(),
      id: this.editForm.get(['id'])!.value,
      producto: this.editForm.get(['producto'])!.value,
      peso: this.editForm.get(['peso'])!.value,
      finca: this.editForm.get(['finca'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICosecha>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IFinca): any {
    return item.id;
  }
}

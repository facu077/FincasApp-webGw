import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICampo, Campo } from 'app/shared/model/fincasMs/campo.model';
import { CampoService } from './campo.service';
import { IFinca } from 'app/shared/model/fincasMs/finca.model';
import { FincaService } from 'app/entities/fincasMs/finca/finca.service';

@Component({
  selector: 'jhi-campo-update',
  templateUrl: './campo-update.component.html',
})
export class CampoUpdateComponent implements OnInit {
  isSaving = false;
  fincas: IFinca[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    sembrado: [],
    fechaPlantado: [],
    fechaCosecha: [],
    producto: [],
    tamano: [],
    finca: [],
  });

  constructor(
    protected campoService: CampoService,
    protected fincaService: FincaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ campo }) => {
      if (!campo.id) {
        const today = moment().startOf('day');
        campo.fechaPlantado = today;
        campo.fechaCosecha = today;
      }

      this.updateForm(campo);

      this.fincaService.query().subscribe((res: HttpResponse<IFinca[]>) => (this.fincas = res.body || []));
    });
  }

  updateForm(campo: ICampo): void {
    this.editForm.patchValue({
      id: campo.id,
      nombre: campo.nombre,
      sembrado: campo.sembrado,
      fechaPlantado: campo.fechaPlantado ? campo.fechaPlantado.format(DATE_TIME_FORMAT) : null,
      fechaCosecha: campo.fechaCosecha ? campo.fechaCosecha.format(DATE_TIME_FORMAT) : null,
      producto: campo.producto,
      tamano: campo.tamano,
      finca: campo.finca,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const campo = this.createFromForm();
    if (campo.id !== undefined) {
      this.subscribeToSaveResponse(this.campoService.update(campo));
    } else {
      this.subscribeToSaveResponse(this.campoService.create(campo));
    }
  }

  private createFromForm(): ICampo {
    return {
      ...new Campo(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      sembrado: this.editForm.get(['sembrado'])!.value,
      fechaPlantado: this.editForm.get(['fechaPlantado'])!.value
        ? moment(this.editForm.get(['fechaPlantado'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaCosecha: this.editForm.get(['fechaCosecha'])!.value
        ? moment(this.editForm.get(['fechaCosecha'])!.value, DATE_TIME_FORMAT)
        : undefined,
      producto: this.editForm.get(['producto'])!.value,
      tamano: this.editForm.get(['tamano'])!.value,
      finca: this.editForm.get(['finca'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICampo>>): void {
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

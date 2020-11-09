import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHerramienta, Herramienta } from 'app/shared/model/fincasMs/herramienta.model';
import { HerramientaService } from './herramienta.service';
import { IFinca } from 'app/shared/model/fincasMs/finca.model';
import { FincaService } from 'app/entities/fincasMs/finca/finca.service';

@Component({
  selector: 'jhi-herramienta-update',
  templateUrl: './herramienta-update.component.html',
})
export class HerramientaUpdateComponent implements OnInit {
  isSaving = false;
  fincas: IFinca[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    descripcion: [],
    finca: [],
  });

  constructor(
    protected herramientaService: HerramientaService,
    protected fincaService: FincaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ herramienta }) => {
      this.updateForm(herramienta);

      this.fincaService.query().subscribe((res: HttpResponse<IFinca[]>) => (this.fincas = res.body || []));
    });
  }

  updateForm(herramienta: IHerramienta): void {
    this.editForm.patchValue({
      id: herramienta.id,
      nombre: herramienta.nombre,
      tipo: herramienta.tipo,
      descripcion: herramienta.descripcion,
      finca: herramienta.finca,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const herramienta = this.createFromForm();
    if (herramienta.id !== undefined) {
      this.subscribeToSaveResponse(this.herramientaService.update(herramienta));
    } else {
      this.subscribeToSaveResponse(this.herramientaService.create(herramienta));
    }
  }

  private createFromForm(): IHerramienta {
    return {
      ...new Herramienta(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      finca: this.editForm.get(['finca'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHerramienta>>): void {
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

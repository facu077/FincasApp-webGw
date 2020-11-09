import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUbicacion, Ubicacion } from 'app/shared/model/fincasMs/ubicacion.model';
import { UbicacionService } from './ubicacion.service';

@Component({
  selector: 'jhi-ubicacion-update',
  templateUrl: './ubicacion-update.component.html',
})
export class UbicacionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    departamento: [null, [Validators.required]],
    calle: [],
    numero: [],
    descripcion: [],
  });

  constructor(protected ubicacionService: UbicacionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ubicacion }) => {
      this.updateForm(ubicacion);
    });
  }

  updateForm(ubicacion: IUbicacion): void {
    this.editForm.patchValue({
      id: ubicacion.id,
      departamento: ubicacion.departamento,
      calle: ubicacion.calle,
      numero: ubicacion.numero,
      descripcion: ubicacion.descripcion,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ubicacion = this.createFromForm();
    if (ubicacion.id !== undefined) {
      this.subscribeToSaveResponse(this.ubicacionService.update(ubicacion));
    } else {
      this.subscribeToSaveResponse(this.ubicacionService.create(ubicacion));
    }
  }

  private createFromForm(): IUbicacion {
    return {
      ...new Ubicacion(),
      id: this.editForm.get(['id'])!.value,
      departamento: this.editForm.get(['departamento'])!.value,
      calle: this.editForm.get(['calle'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUbicacion>>): void {
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
}

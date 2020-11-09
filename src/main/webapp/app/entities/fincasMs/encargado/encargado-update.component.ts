import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEncargado, Encargado } from 'app/shared/model/fincasMs/encargado.model';
import { EncargadoService } from './encargado.service';

@Component({
  selector: 'jhi-encargado-update',
  templateUrl: './encargado-update.component.html',
})
export class EncargadoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    apellido: [],
    email: [],
    telefono: [],
  });

  constructor(protected encargadoService: EncargadoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ encargado }) => {
      this.updateForm(encargado);
    });
  }

  updateForm(encargado: IEncargado): void {
    this.editForm.patchValue({
      id: encargado.id,
      nombre: encargado.nombre,
      apellido: encargado.apellido,
      email: encargado.email,
      telefono: encargado.telefono,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const encargado = this.createFromForm();
    if (encargado.id !== undefined) {
      this.subscribeToSaveResponse(this.encargadoService.update(encargado));
    } else {
      this.subscribeToSaveResponse(this.encargadoService.create(encargado));
    }
  }

  private createFromForm(): IEncargado {
    return {
      ...new Encargado(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      email: this.editForm.get(['email'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEncargado>>): void {
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

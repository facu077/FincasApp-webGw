import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFinca, Finca } from 'app/shared/model/fincasMs/finca.model';
import { FincaService } from './finca.service';
import { IUbicacion } from 'app/shared/model/fincasMs/ubicacion.model';
import { UbicacionService } from 'app/entities/fincasMs/ubicacion/ubicacion.service';
import { IEncargado } from 'app/shared/model/fincasMs/encargado.model';
import { EncargadoService } from 'app/entities/fincasMs/encargado/encargado.service';

type SelectableEntity = IUbicacion | IEncargado;

@Component({
  selector: 'jhi-finca-update',
  templateUrl: './finca-update.component.html',
})
export class FincaUpdateComponent implements OnInit {
  isSaving = false;
  ubicacions: IUbicacion[] = [];
  encargados: IEncargado[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    userLogin: [null],
    ubicacion: [],
    encargado: [],
  });

  constructor(
    protected fincaService: FincaService,
    protected ubicacionService: UbicacionService,
    protected encargadoService: EncargadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ finca }) => {
      this.updateForm(finca);

      this.ubicacionService
        .query({ filter: 'finca-is-null' })
        .pipe(
          map((res: HttpResponse<IUbicacion[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUbicacion[]) => {
          if (!finca.ubicacion || !finca.ubicacion.id) {
            this.ubicacions = resBody;
          } else {
            this.ubicacionService
              .find(finca.ubicacion.id)
              .pipe(
                map((subRes: HttpResponse<IUbicacion>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUbicacion[]) => (this.ubicacions = concatRes));
          }
        });

      this.encargadoService
        .query({ filter: 'finca-is-null' })
        .pipe(
          map((res: HttpResponse<IEncargado[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEncargado[]) => {
          if (!finca.encargado || !finca.encargado.id) {
            this.encargados = resBody;
          } else {
            this.encargadoService
              .find(finca.encargado.id)
              .pipe(
                map((subRes: HttpResponse<IEncargado>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEncargado[]) => (this.encargados = concatRes));
          }
        });
    });
  }

  updateForm(finca: IFinca): void {
    this.editForm.patchValue({
      id: finca.id,
      nombre: finca.nombre,
      userLogin: finca.userLogin,
      ubicacion: finca.ubicacion,
      encargado: finca.encargado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const finca = this.createFromForm();
    finca.userLogin = ' ';
    if (finca.id !== undefined) {
      this.subscribeToSaveResponse(this.fincaService.update(finca));
    } else {
      this.subscribeToSaveResponse(this.fincaService.create(finca));
    }
  }

  private createFromForm(): IFinca {
    return {
      ...new Finca(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      userLogin: this.editForm.get(['userLogin'])!.value,
      ubicacion: this.editForm.get(['ubicacion'])!.value,
      encargado: this.editForm.get(['encargado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFinca>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}

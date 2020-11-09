import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICampo } from 'app/shared/model/fincasMs/campo.model';

type EntityResponseType = HttpResponse<ICampo>;
type EntityArrayResponseType = HttpResponse<ICampo[]>;

@Injectable({ providedIn: 'root' })
export class CampoService {
  public resourceUrl = SERVER_API_URL + 'services/fincasms/api/campos';

  constructor(protected http: HttpClient) {}

  create(campo: ICampo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(campo);
    return this.http
      .post<ICampo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(campo: ICampo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(campo);
    return this.http
      .put<ICampo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICampo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICampo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(campo: ICampo): ICampo {
    const copy: ICampo = Object.assign({}, campo, {
      fechaPlantado: campo.fechaPlantado && campo.fechaPlantado.isValid() ? campo.fechaPlantado.toJSON() : undefined,
      fechaCosecha: campo.fechaCosecha && campo.fechaCosecha.isValid() ? campo.fechaCosecha.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaPlantado = res.body.fechaPlantado ? moment(res.body.fechaPlantado) : undefined;
      res.body.fechaCosecha = res.body.fechaCosecha ? moment(res.body.fechaCosecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((campo: ICampo) => {
        campo.fechaPlantado = campo.fechaPlantado ? moment(campo.fechaPlantado) : undefined;
        campo.fechaCosecha = campo.fechaCosecha ? moment(campo.fechaCosecha) : undefined;
      });
    }
    return res;
  }
}

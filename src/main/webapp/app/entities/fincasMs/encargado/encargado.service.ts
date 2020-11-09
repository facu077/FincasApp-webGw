import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEncargado } from 'app/shared/model/fincasMs/encargado.model';

type EntityResponseType = HttpResponse<IEncargado>;
type EntityArrayResponseType = HttpResponse<IEncargado[]>;

@Injectable({ providedIn: 'root' })
export class EncargadoService {
  public resourceUrl = SERVER_API_URL + 'services/fincasms/api/encargados';

  constructor(protected http: HttpClient) {}

  create(encargado: IEncargado): Observable<EntityResponseType> {
    return this.http.post<IEncargado>(this.resourceUrl, encargado, { observe: 'response' });
  }

  update(encargado: IEncargado): Observable<EntityResponseType> {
    return this.http.put<IEncargado>(this.resourceUrl, encargado, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEncargado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEncargado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

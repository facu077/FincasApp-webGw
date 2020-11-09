import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHerramienta } from 'app/shared/model/fincasMs/herramienta.model';

type EntityResponseType = HttpResponse<IHerramienta>;
type EntityArrayResponseType = HttpResponse<IHerramienta[]>;

@Injectable({ providedIn: 'root' })
export class HerramientaService {
  public resourceUrl = SERVER_API_URL + 'services/fincasms/api/herramientas';

  constructor(protected http: HttpClient) {}

  create(herramienta: IHerramienta): Observable<EntityResponseType> {
    return this.http.post<IHerramienta>(this.resourceUrl, herramienta, { observe: 'response' });
  }

  update(herramienta: IHerramienta): Observable<EntityResponseType> {
    return this.http.put<IHerramienta>(this.resourceUrl, herramienta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHerramienta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHerramienta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

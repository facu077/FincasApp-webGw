import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFinca } from 'app/shared/model/fincasMs/finca.model';

type EntityResponseType = HttpResponse<IFinca>;
type EntityArrayResponseType = HttpResponse<IFinca[]>;

@Injectable({ providedIn: 'root' })
export class FincaService {
  public resourceUrl = SERVER_API_URL + 'services/fincasms/api/fincas';

  constructor(protected http: HttpClient) {}

  getCurrentUserFincas(): Observable<EntityArrayResponseType> {
    return this.http.get<IFinca[]>(`${this.resourceUrl}/currentuser`, { observe: 'response' });
  }

  create(finca: IFinca): Observable<EntityResponseType> {
    return this.http.post<IFinca>(this.resourceUrl, finca, { observe: 'response' });
  }

  update(finca: IFinca): Observable<EntityResponseType> {
    return this.http.put<IFinca>(this.resourceUrl, finca, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFinca>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFinca[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

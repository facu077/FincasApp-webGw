import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICosecha } from 'app/shared/model/fincasMs/cosecha.model';

type EntityResponseType = HttpResponse<ICosecha>;
type EntityArrayResponseType = HttpResponse<ICosecha[]>;

@Injectable({ providedIn: 'root' })
export class CosechaService {
  public resourceUrl = SERVER_API_URL + 'services/fincasms/api/cosechas';

  constructor(protected http: HttpClient) {}

  create(cosecha: ICosecha): Observable<EntityResponseType> {
    return this.http.post<ICosecha>(this.resourceUrl, cosecha, { observe: 'response' });
  }

  update(cosecha: ICosecha): Observable<EntityResponseType> {
    return this.http.put<ICosecha>(this.resourceUrl, cosecha, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICosecha>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICosecha[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

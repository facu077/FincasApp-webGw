import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEncargado, Encargado } from 'app/shared/model/fincasMs/encargado.model';
import { EncargadoService } from './encargado.service';
import { EncargadoComponent } from './encargado.component';
import { EncargadoDetailComponent } from './encargado-detail.component';
import { EncargadoUpdateComponent } from './encargado-update.component';

@Injectable({ providedIn: 'root' })
export class EncargadoResolve implements Resolve<IEncargado> {
  constructor(private service: EncargadoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEncargado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((encargado: HttpResponse<Encargado>) => {
          if (encargado.body) {
            return of(encargado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Encargado());
  }
}

export const encargadoRoute: Routes = [
  {
    path: '',
    component: EncargadoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Encargados',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EncargadoDetailComponent,
    resolve: {
      encargado: EncargadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Encargados',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EncargadoUpdateComponent,
    resolve: {
      encargado: EncargadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Encargados',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EncargadoUpdateComponent,
    resolve: {
      encargado: EncargadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Encargados',
    },
    canActivate: [UserRouteAccessService],
  },
];

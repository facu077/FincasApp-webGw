import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICampo, Campo } from 'app/shared/model/fincasMs/campo.model';
import { CampoService } from './campo.service';
import { CampoComponent } from './campo.component';
import { CampoDetailComponent } from './campo-detail.component';
import { CampoUpdateComponent } from './campo-update.component';

@Injectable({ providedIn: 'root' })
export class CampoResolve implements Resolve<ICampo> {
  constructor(private service: CampoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICampo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((campo: HttpResponse<Campo>) => {
          if (campo.body) {
            return of(campo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Campo());
  }
}

export const campoRoute: Routes = [
  {
    path: '',
    component: CampoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Campos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CampoDetailComponent,
    resolve: {
      campo: CampoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Campos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CampoUpdateComponent,
    resolve: {
      campo: CampoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Campos',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CampoUpdateComponent,
    resolve: {
      campo: CampoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Campos',
    },
    canActivate: [UserRouteAccessService],
  },
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFinca, Finca } from 'app/shared/model/fincasMs/finca.model';
import { FincaService } from './finca.service';
import { FincaComponent } from './finca.component';
import { FincaDetailComponent } from './finca-detail.component';
import { FincaUpdateComponent } from './finca-update.component';

@Injectable({ providedIn: 'root' })
export class FincaResolve implements Resolve<IFinca> {
  constructor(private service: FincaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFinca> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((finca: HttpResponse<Finca>) => {
          if (finca.body) {
            return of(finca.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Finca());
  }
}

export const fincaRoute: Routes = [
  {
    path: '',
    component: FincaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Fincas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FincaDetailComponent,
    resolve: {
      finca: FincaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Fincas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FincaUpdateComponent,
    resolve: {
      finca: FincaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Fincas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FincaUpdateComponent,
    resolve: {
      finca: FincaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Fincas',
    },
    canActivate: [UserRouteAccessService],
  },
];

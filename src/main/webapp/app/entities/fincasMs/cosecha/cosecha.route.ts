import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICosecha, Cosecha } from 'app/shared/model/fincasMs/cosecha.model';
import { CosechaService } from './cosecha.service';
import { CosechaComponent } from './cosecha.component';
import { CosechaDetailComponent } from './cosecha-detail.component';
import { CosechaUpdateComponent } from './cosecha-update.component';

@Injectable({ providedIn: 'root' })
export class CosechaResolve implements Resolve<ICosecha> {
  constructor(private service: CosechaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICosecha> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cosecha: HttpResponse<Cosecha>) => {
          if (cosecha.body) {
            return of(cosecha.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cosecha());
  }
}

export const cosechaRoute: Routes = [
  {
    path: '',
    component: CosechaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cosechas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CosechaDetailComponent,
    resolve: {
      cosecha: CosechaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cosechas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CosechaUpdateComponent,
    resolve: {
      cosecha: CosechaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cosechas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CosechaUpdateComponent,
    resolve: {
      cosecha: CosechaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cosechas',
    },
    canActivate: [UserRouteAccessService],
  },
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHerramienta, Herramienta } from 'app/shared/model/fincasMs/herramienta.model';
import { HerramientaService } from './herramienta.service';
import { HerramientaComponent } from './herramienta.component';
import { HerramientaDetailComponent } from './herramienta-detail.component';
import { HerramientaUpdateComponent } from './herramienta-update.component';

@Injectable({ providedIn: 'root' })
export class HerramientaResolve implements Resolve<IHerramienta> {
  constructor(private service: HerramientaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHerramienta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((herramienta: HttpResponse<Herramienta>) => {
          if (herramienta.body) {
            return of(herramienta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Herramienta());
  }
}

export const herramientaRoute: Routes = [
  {
    path: '',
    component: HerramientaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Herramientas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HerramientaDetailComponent,
    resolve: {
      herramienta: HerramientaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Herramientas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HerramientaUpdateComponent,
    resolve: {
      herramienta: HerramientaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Herramientas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HerramientaUpdateComponent,
    resolve: {
      herramienta: HerramientaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Herramientas',
    },
    canActivate: [UserRouteAccessService],
  },
];

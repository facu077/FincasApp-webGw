import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUbicacion, Ubicacion } from 'app/shared/model/fincasMs/ubicacion.model';
import { UbicacionService } from './ubicacion.service';
import { UbicacionComponent } from './ubicacion.component';
import { UbicacionDetailComponent } from './ubicacion-detail.component';
import { UbicacionUpdateComponent } from './ubicacion-update.component';

@Injectable({ providedIn: 'root' })
export class UbicacionResolve implements Resolve<IUbicacion> {
  constructor(private service: UbicacionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUbicacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ubicacion: HttpResponse<Ubicacion>) => {
          if (ubicacion.body) {
            return of(ubicacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ubicacion());
  }
}

export const ubicacionRoute: Routes = [
  {
    path: '',
    component: UbicacionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ubicacions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UbicacionDetailComponent,
    resolve: {
      ubicacion: UbicacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ubicacions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UbicacionUpdateComponent,
    resolve: {
      ubicacion: UbicacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ubicacions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UbicacionUpdateComponent,
    resolve: {
      ubicacion: UbicacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ubicacions',
    },
    canActivate: [UserRouteAccessService],
  },
];

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'finca',
        loadChildren: () => import('./fincasMs/finca/finca.module').then(m => m.FincasMsFincaModule),
      },
      {
        path: 'cosecha',
        loadChildren: () => import('./fincasMs/cosecha/cosecha.module').then(m => m.FincasMsCosechaModule),
      },
      {
        path: 'ubicacion',
        loadChildren: () => import('./fincasMs/ubicacion/ubicacion.module').then(m => m.FincasMsUbicacionModule),
      },
      {
        path: 'campo',
        loadChildren: () => import('./fincasMs/campo/campo.module').then(m => m.FincasMsCampoModule),
      },
      {
        path: 'encargado',
        loadChildren: () => import('./fincasMs/encargado/encargado.module').then(m => m.FincasMsEncargadoModule),
      },
      {
        path: 'herramienta',
        loadChildren: () => import('./fincasMs/herramienta/herramienta.module').then(m => m.FincasMsHerramientaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class WebGatewayEntityModule {}

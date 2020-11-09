import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebGatewaySharedModule } from 'app/shared/shared.module';
import { UbicacionComponent } from './ubicacion.component';
import { UbicacionDetailComponent } from './ubicacion-detail.component';
import { UbicacionUpdateComponent } from './ubicacion-update.component';
import { UbicacionDeleteDialogComponent } from './ubicacion-delete-dialog.component';
import { ubicacionRoute } from './ubicacion.route';

@NgModule({
  imports: [WebGatewaySharedModule, RouterModule.forChild(ubicacionRoute)],
  declarations: [UbicacionComponent, UbicacionDetailComponent, UbicacionUpdateComponent, UbicacionDeleteDialogComponent],
  entryComponents: [UbicacionDeleteDialogComponent],
})
export class FincasMsUbicacionModule {}

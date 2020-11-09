import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebGatewaySharedModule } from 'app/shared/shared.module';
import { EncargadoComponent } from './encargado.component';
import { EncargadoDetailComponent } from './encargado-detail.component';
import { EncargadoUpdateComponent } from './encargado-update.component';
import { EncargadoDeleteDialogComponent } from './encargado-delete-dialog.component';
import { encargadoRoute } from './encargado.route';

@NgModule({
  imports: [WebGatewaySharedModule, RouterModule.forChild(encargadoRoute)],
  declarations: [EncargadoComponent, EncargadoDetailComponent, EncargadoUpdateComponent, EncargadoDeleteDialogComponent],
  entryComponents: [EncargadoDeleteDialogComponent],
})
export class FincasMsEncargadoModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebGatewaySharedModule } from 'app/shared/shared.module';
import { CampoComponent } from './campo.component';
import { CampoDetailComponent } from './campo-detail.component';
import { CampoUpdateComponent } from './campo-update.component';
import { CampoDeleteDialogComponent } from './campo-delete-dialog.component';
import { campoRoute } from './campo.route';

@NgModule({
  imports: [WebGatewaySharedModule, RouterModule.forChild(campoRoute)],
  declarations: [CampoComponent, CampoDetailComponent, CampoUpdateComponent, CampoDeleteDialogComponent],
  entryComponents: [CampoDeleteDialogComponent],
})
export class FincasMsCampoModule {}

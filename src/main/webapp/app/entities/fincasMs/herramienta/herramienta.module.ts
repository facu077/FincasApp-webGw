import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebGatewaySharedModule } from 'app/shared/shared.module';
import { HerramientaComponent } from './herramienta.component';
import { HerramientaDetailComponent } from './herramienta-detail.component';
import { HerramientaUpdateComponent } from './herramienta-update.component';
import { HerramientaDeleteDialogComponent } from './herramienta-delete-dialog.component';
import { herramientaRoute } from './herramienta.route';

@NgModule({
  imports: [WebGatewaySharedModule, RouterModule.forChild(herramientaRoute)],
  declarations: [HerramientaComponent, HerramientaDetailComponent, HerramientaUpdateComponent, HerramientaDeleteDialogComponent],
  entryComponents: [HerramientaDeleteDialogComponent],
})
export class FincasMsHerramientaModule {}

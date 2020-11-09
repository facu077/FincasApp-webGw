import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebGatewaySharedModule } from 'app/shared/shared.module';
import { FincaComponent } from './finca.component';
import { FincaDetailComponent } from './finca-detail.component';
import { FincaUpdateComponent } from './finca-update.component';
import { FincaDeleteDialogComponent } from './finca-delete-dialog.component';
import { fincaRoute } from './finca.route';

@NgModule({
  imports: [WebGatewaySharedModule, RouterModule.forChild(fincaRoute)],
  declarations: [FincaComponent, FincaDetailComponent, FincaUpdateComponent, FincaDeleteDialogComponent],
  entryComponents: [FincaDeleteDialogComponent],
})
export class FincasMsFincaModule {}

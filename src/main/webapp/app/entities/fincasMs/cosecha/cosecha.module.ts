import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebGatewaySharedModule } from 'app/shared/shared.module';
import { CosechaComponent } from './cosecha.component';
import { CosechaDetailComponent } from './cosecha-detail.component';
import { CosechaUpdateComponent } from './cosecha-update.component';
import { CosechaDeleteDialogComponent } from './cosecha-delete-dialog.component';
import { cosechaRoute } from './cosecha.route';

@NgModule({
  imports: [WebGatewaySharedModule, RouterModule.forChild(cosechaRoute)],
  declarations: [CosechaComponent, CosechaDetailComponent, CosechaUpdateComponent, CosechaDeleteDialogComponent],
  entryComponents: [CosechaDeleteDialogComponent],
})
export class FincasMsCosechaModule {}

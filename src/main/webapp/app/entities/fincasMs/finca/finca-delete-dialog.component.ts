import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFinca } from 'app/shared/model/fincasMs/finca.model';
import { FincaService } from './finca.service';

@Component({
  templateUrl: './finca-delete-dialog.component.html',
})
export class FincaDeleteDialogComponent {
  finca?: IFinca;

  constructor(protected fincaService: FincaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fincaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fincaListModification');
      this.activeModal.close();
    });
  }
}

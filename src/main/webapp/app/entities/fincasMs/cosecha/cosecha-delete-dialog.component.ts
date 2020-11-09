import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICosecha } from 'app/shared/model/fincasMs/cosecha.model';
import { CosechaService } from './cosecha.service';

@Component({
  templateUrl: './cosecha-delete-dialog.component.html',
})
export class CosechaDeleteDialogComponent {
  cosecha?: ICosecha;

  constructor(protected cosechaService: CosechaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cosechaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cosechaListModification');
      this.activeModal.close();
    });
  }
}

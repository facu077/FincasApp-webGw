import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICampo } from 'app/shared/model/fincasMs/campo.model';
import { CampoService } from './campo.service';

@Component({
  templateUrl: './campo-delete-dialog.component.html',
})
export class CampoDeleteDialogComponent {
  campo?: ICampo;

  constructor(protected campoService: CampoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.campoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('campoListModification');
      this.activeModal.close();
    });
  }
}

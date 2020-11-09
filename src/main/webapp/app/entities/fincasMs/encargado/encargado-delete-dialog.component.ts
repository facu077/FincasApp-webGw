import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEncargado } from 'app/shared/model/fincasMs/encargado.model';
import { EncargadoService } from './encargado.service';

@Component({
  templateUrl: './encargado-delete-dialog.component.html',
})
export class EncargadoDeleteDialogComponent {
  encargado?: IEncargado;

  constructor(protected encargadoService: EncargadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.encargadoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('encargadoListModification');
      this.activeModal.close();
    });
  }
}

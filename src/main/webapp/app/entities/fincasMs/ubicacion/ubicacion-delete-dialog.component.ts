import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUbicacion } from 'app/shared/model/fincasMs/ubicacion.model';
import { UbicacionService } from './ubicacion.service';

@Component({
  templateUrl: './ubicacion-delete-dialog.component.html',
})
export class UbicacionDeleteDialogComponent {
  ubicacion?: IUbicacion;

  constructor(protected ubicacionService: UbicacionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ubicacionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ubicacionListModification');
      this.activeModal.close();
    });
  }
}

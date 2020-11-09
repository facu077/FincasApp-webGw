import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHerramienta } from 'app/shared/model/fincasMs/herramienta.model';
import { HerramientaService } from './herramienta.service';

@Component({
  templateUrl: './herramienta-delete-dialog.component.html',
})
export class HerramientaDeleteDialogComponent {
  herramienta?: IHerramienta;

  constructor(
    protected herramientaService: HerramientaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.herramientaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('herramientaListModification');
      this.activeModal.close();
    });
  }
}

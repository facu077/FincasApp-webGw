import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEncargado } from 'app/shared/model/fincasMs/encargado.model';
import { EncargadoService } from './encargado.service';
import { EncargadoDeleteDialogComponent } from './encargado-delete-dialog.component';

@Component({
  selector: 'jhi-encargado',
  templateUrl: './encargado.component.html',
})
export class EncargadoComponent implements OnInit, OnDestroy {
  encargados?: IEncargado[];
  eventSubscriber?: Subscription;

  constructor(protected encargadoService: EncargadoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.encargadoService.query().subscribe((res: HttpResponse<IEncargado[]>) => (this.encargados = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEncargados();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEncargado): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEncargados(): void {
    this.eventSubscriber = this.eventManager.subscribe('encargadoListModification', () => this.loadAll());
  }

  delete(encargado: IEncargado): void {
    const modalRef = this.modalService.open(EncargadoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.encargado = encargado;
  }
}

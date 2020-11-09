import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICampo } from 'app/shared/model/fincasMs/campo.model';
import { CampoService } from './campo.service';
import { CampoDeleteDialogComponent } from './campo-delete-dialog.component';

@Component({
  selector: 'jhi-campo',
  templateUrl: './campo.component.html',
})
export class CampoComponent implements OnInit, OnDestroy {
  campos?: ICampo[];
  eventSubscriber?: Subscription;

  constructor(protected campoService: CampoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.campoService.query().subscribe((res: HttpResponse<ICampo[]>) => (this.campos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCampos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICampo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCampos(): void {
    this.eventSubscriber = this.eventManager.subscribe('campoListModification', () => this.loadAll());
  }

  delete(campo: ICampo): void {
    const modalRef = this.modalService.open(CampoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.campo = campo;
  }
}

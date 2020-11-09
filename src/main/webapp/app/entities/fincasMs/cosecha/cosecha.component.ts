import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICosecha } from 'app/shared/model/fincasMs/cosecha.model';
import { CosechaService } from './cosecha.service';
import { CosechaDeleteDialogComponent } from './cosecha-delete-dialog.component';

@Component({
  selector: 'jhi-cosecha',
  templateUrl: './cosecha.component.html',
})
export class CosechaComponent implements OnInit, OnDestroy {
  cosechas?: ICosecha[];
  eventSubscriber?: Subscription;

  constructor(protected cosechaService: CosechaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cosechaService.query().subscribe((res: HttpResponse<ICosecha[]>) => (this.cosechas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCosechas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICosecha): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCosechas(): void {
    this.eventSubscriber = this.eventManager.subscribe('cosechaListModification', () => this.loadAll());
  }

  delete(cosecha: ICosecha): void {
    const modalRef = this.modalService.open(CosechaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cosecha = cosecha;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUbicacion } from 'app/shared/model/fincasMs/ubicacion.model';
import { UbicacionService } from './ubicacion.service';
import { UbicacionDeleteDialogComponent } from './ubicacion-delete-dialog.component';

@Component({
  selector: 'jhi-ubicacion',
  templateUrl: './ubicacion.component.html',
})
export class UbicacionComponent implements OnInit, OnDestroy {
  ubicacions?: IUbicacion[];
  eventSubscriber?: Subscription;

  constructor(protected ubicacionService: UbicacionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ubicacionService.query().subscribe((res: HttpResponse<IUbicacion[]>) => (this.ubicacions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUbicacions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUbicacion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUbicacions(): void {
    this.eventSubscriber = this.eventManager.subscribe('ubicacionListModification', () => this.loadAll());
  }

  delete(ubicacion: IUbicacion): void {
    const modalRef = this.modalService.open(UbicacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ubicacion = ubicacion;
  }
}

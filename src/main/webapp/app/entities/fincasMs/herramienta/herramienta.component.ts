import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHerramienta } from 'app/shared/model/fincasMs/herramienta.model';
import { HerramientaService } from './herramienta.service';
import { HerramientaDeleteDialogComponent } from './herramienta-delete-dialog.component';

@Component({
  selector: 'jhi-herramienta',
  templateUrl: './herramienta.component.html',
})
export class HerramientaComponent implements OnInit, OnDestroy {
  herramientas?: IHerramienta[];
  eventSubscriber?: Subscription;

  constructor(
    protected herramientaService: HerramientaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.herramientaService.query().subscribe((res: HttpResponse<IHerramienta[]>) => (this.herramientas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHerramientas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHerramienta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHerramientas(): void {
    this.eventSubscriber = this.eventManager.subscribe('herramientaListModification', () => this.loadAll());
  }

  delete(herramienta: IHerramienta): void {
    const modalRef = this.modalService.open(HerramientaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.herramienta = herramienta;
  }
}

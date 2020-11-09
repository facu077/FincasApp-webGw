import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { UbicacionDetailComponent } from 'app/entities/fincasMs/ubicacion/ubicacion-detail.component';
import { Ubicacion } from 'app/shared/model/fincasMs/ubicacion.model';

describe('Component Tests', () => {
  describe('Ubicacion Management Detail Component', () => {
    let comp: UbicacionDetailComponent;
    let fixture: ComponentFixture<UbicacionDetailComponent>;
    const route = ({ data: of({ ubicacion: new Ubicacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [UbicacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UbicacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UbicacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ubicacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ubicacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

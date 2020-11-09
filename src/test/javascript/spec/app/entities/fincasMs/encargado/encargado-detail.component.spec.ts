import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { EncargadoDetailComponent } from 'app/entities/fincasMs/encargado/encargado-detail.component';
import { Encargado } from 'app/shared/model/fincasMs/encargado.model';

describe('Component Tests', () => {
  describe('Encargado Management Detail Component', () => {
    let comp: EncargadoDetailComponent;
    let fixture: ComponentFixture<EncargadoDetailComponent>;
    const route = ({ data: of({ encargado: new Encargado(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [EncargadoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EncargadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EncargadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load encargado on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.encargado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

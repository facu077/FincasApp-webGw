import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebGatewayTestModule } from '../../../../test.module';
import { EncargadoComponent } from 'app/entities/fincasMs/encargado/encargado.component';
import { EncargadoService } from 'app/entities/fincasMs/encargado/encargado.service';
import { Encargado } from 'app/shared/model/fincasMs/encargado.model';

describe('Component Tests', () => {
  describe('Encargado Management Component', () => {
    let comp: EncargadoComponent;
    let fixture: ComponentFixture<EncargadoComponent>;
    let service: EncargadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [EncargadoComponent],
      })
        .overrideTemplate(EncargadoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EncargadoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EncargadoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Encargado(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.encargados && comp.encargados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

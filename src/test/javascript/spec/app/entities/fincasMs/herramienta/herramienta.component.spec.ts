import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebGatewayTestModule } from '../../../../test.module';
import { HerramientaComponent } from 'app/entities/fincasMs/herramienta/herramienta.component';
import { HerramientaService } from 'app/entities/fincasMs/herramienta/herramienta.service';
import { Herramienta } from 'app/shared/model/fincasMs/herramienta.model';

describe('Component Tests', () => {
  describe('Herramienta Management Component', () => {
    let comp: HerramientaComponent;
    let fixture: ComponentFixture<HerramientaComponent>;
    let service: HerramientaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [HerramientaComponent],
      })
        .overrideTemplate(HerramientaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HerramientaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HerramientaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Herramienta(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.herramientas && comp.herramientas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

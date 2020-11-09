import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebGatewayTestModule } from '../../../../test.module';
import { CosechaComponent } from 'app/entities/fincasMs/cosecha/cosecha.component';
import { CosechaService } from 'app/entities/fincasMs/cosecha/cosecha.service';
import { Cosecha } from 'app/shared/model/fincasMs/cosecha.model';

describe('Component Tests', () => {
  describe('Cosecha Management Component', () => {
    let comp: CosechaComponent;
    let fixture: ComponentFixture<CosechaComponent>;
    let service: CosechaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [CosechaComponent],
      })
        .overrideTemplate(CosechaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CosechaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CosechaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cosecha(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cosechas && comp.cosechas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

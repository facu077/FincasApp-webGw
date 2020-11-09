import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WebGatewayTestModule } from '../../../../test.module';
import { CampoComponent } from 'app/entities/fincasMs/campo/campo.component';
import { CampoService } from 'app/entities/fincasMs/campo/campo.service';
import { Campo } from 'app/shared/model/fincasMs/campo.model';

describe('Component Tests', () => {
  describe('Campo Management Component', () => {
    let comp: CampoComponent;
    let fixture: ComponentFixture<CampoComponent>;
    let service: CampoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [CampoComponent],
      })
        .overrideTemplate(CampoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CampoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CampoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Campo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.campos && comp.campos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

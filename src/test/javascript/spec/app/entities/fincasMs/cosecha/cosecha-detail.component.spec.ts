import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { CosechaDetailComponent } from 'app/entities/fincasMs/cosecha/cosecha-detail.component';
import { Cosecha } from 'app/shared/model/fincasMs/cosecha.model';

describe('Component Tests', () => {
  describe('Cosecha Management Detail Component', () => {
    let comp: CosechaDetailComponent;
    let fixture: ComponentFixture<CosechaDetailComponent>;
    const route = ({ data: of({ cosecha: new Cosecha(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [CosechaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CosechaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CosechaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cosecha on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cosecha).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

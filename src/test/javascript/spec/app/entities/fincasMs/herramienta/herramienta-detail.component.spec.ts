import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { HerramientaDetailComponent } from 'app/entities/fincasMs/herramienta/herramienta-detail.component';
import { Herramienta } from 'app/shared/model/fincasMs/herramienta.model';

describe('Component Tests', () => {
  describe('Herramienta Management Detail Component', () => {
    let comp: HerramientaDetailComponent;
    let fixture: ComponentFixture<HerramientaDetailComponent>;
    const route = ({ data: of({ herramienta: new Herramienta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [HerramientaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(HerramientaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HerramientaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load herramienta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.herramienta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

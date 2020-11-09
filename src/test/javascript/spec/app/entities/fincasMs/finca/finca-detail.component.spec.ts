import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { FincaDetailComponent } from 'app/entities/fincasMs/finca/finca-detail.component';
import { Finca } from 'app/shared/model/fincasMs/finca.model';

describe('Component Tests', () => {
  describe('Finca Management Detail Component', () => {
    let comp: FincaDetailComponent;
    let fixture: ComponentFixture<FincaDetailComponent>;
    const route = ({ data: of({ finca: new Finca(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [FincaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FincaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FincaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load finca on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.finca).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

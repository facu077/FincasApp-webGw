import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { CampoDetailComponent } from 'app/entities/fincasMs/campo/campo-detail.component';
import { Campo } from 'app/shared/model/fincasMs/campo.model';

describe('Component Tests', () => {
  describe('Campo Management Detail Component', () => {
    let comp: CampoDetailComponent;
    let fixture: ComponentFixture<CampoDetailComponent>;
    const route = ({ data: of({ campo: new Campo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [CampoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CampoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CampoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load campo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.campo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

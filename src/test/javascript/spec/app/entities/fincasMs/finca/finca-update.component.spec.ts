import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { FincaUpdateComponent } from 'app/entities/fincasMs/finca/finca-update.component';
import { FincaService } from 'app/entities/fincasMs/finca/finca.service';
import { Finca } from 'app/shared/model/fincasMs/finca.model';

xdescribe('Component Tests', () => {
  describe('Finca Management Update Component', () => {
    let comp: FincaUpdateComponent;
    let fixture: ComponentFixture<FincaUpdateComponent>;
    let service: FincaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [FincaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FincaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FincaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FincaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Finca(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Finca();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

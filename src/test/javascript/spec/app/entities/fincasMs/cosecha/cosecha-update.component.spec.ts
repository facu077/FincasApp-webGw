import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { CosechaUpdateComponent } from 'app/entities/fincasMs/cosecha/cosecha-update.component';
import { CosechaService } from 'app/entities/fincasMs/cosecha/cosecha.service';
import { Cosecha } from 'app/shared/model/fincasMs/cosecha.model';

describe('Component Tests', () => {
  describe('Cosecha Management Update Component', () => {
    let comp: CosechaUpdateComponent;
    let fixture: ComponentFixture<CosechaUpdateComponent>;
    let service: CosechaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [CosechaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CosechaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CosechaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CosechaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cosecha(123);
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
        const entity = new Cosecha();
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

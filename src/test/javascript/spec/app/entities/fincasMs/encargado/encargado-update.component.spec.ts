import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { EncargadoUpdateComponent } from 'app/entities/fincasMs/encargado/encargado-update.component';
import { EncargadoService } from 'app/entities/fincasMs/encargado/encargado.service';
import { Encargado } from 'app/shared/model/fincasMs/encargado.model';

describe('Component Tests', () => {
  describe('Encargado Management Update Component', () => {
    let comp: EncargadoUpdateComponent;
    let fixture: ComponentFixture<EncargadoUpdateComponent>;
    let service: EncargadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [EncargadoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EncargadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EncargadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EncargadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Encargado(123);
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
        const entity = new Encargado();
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

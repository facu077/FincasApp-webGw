import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WebGatewayTestModule } from '../../../../test.module';
import { CampoUpdateComponent } from 'app/entities/fincasMs/campo/campo-update.component';
import { CampoService } from 'app/entities/fincasMs/campo/campo.service';
import { Campo } from 'app/shared/model/fincasMs/campo.model';

describe('Component Tests', () => {
  describe('Campo Management Update Component', () => {
    let comp: CampoUpdateComponent;
    let fixture: ComponentFixture<CampoUpdateComponent>;
    let service: CampoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WebGatewayTestModule],
        declarations: [CampoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CampoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CampoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CampoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Campo(123);
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
        const entity = new Campo();
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

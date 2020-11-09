import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CampoService } from 'app/entities/fincasMs/campo/campo.service';
import { ICampo, Campo } from 'app/shared/model/fincasMs/campo.model';

describe('Service Tests', () => {
  describe('Campo Service', () => {
    let injector: TestBed;
    let service: CampoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICampo;
    let expectedResult: ICampo | ICampo[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CampoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Campo(0, 'AAAAAAA', false, currentDate, currentDate, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaPlantado: currentDate.format(DATE_TIME_FORMAT),
            fechaCosecha: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Campo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaPlantado: currentDate.format(DATE_TIME_FORMAT),
            fechaCosecha: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPlantado: currentDate,
            fechaCosecha: currentDate,
          },
          returnedFromService
        );

        service.create(new Campo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Campo', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            sembrado: true,
            fechaPlantado: currentDate.format(DATE_TIME_FORMAT),
            fechaCosecha: currentDate.format(DATE_TIME_FORMAT),
            producto: 'BBBBBB',
            tamano: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPlantado: currentDate,
            fechaCosecha: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Campo', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            sembrado: true,
            fechaPlantado: currentDate.format(DATE_TIME_FORMAT),
            fechaCosecha: currentDate.format(DATE_TIME_FORMAT),
            producto: 'BBBBBB',
            tamano: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPlantado: currentDate,
            fechaCosecha: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Campo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

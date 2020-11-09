import { Moment } from 'moment';
import { IFinca } from 'app/shared/model/fincasMs/finca.model';

export interface ICampo {
  id?: number;
  nombre?: string;
  sembrado?: boolean;
  fechaPlantado?: Moment;
  fechaCosecha?: Moment;
  producto?: string;
  tamano?: number;
  finca?: IFinca;
}

export class Campo implements ICampo {
  constructor(
    public id?: number,
    public nombre?: string,
    public sembrado?: boolean,
    public fechaPlantado?: Moment,
    public fechaCosecha?: Moment,
    public producto?: string,
    public tamano?: number,
    public finca?: IFinca
  ) {
    this.sembrado = this.sembrado || false;
  }
}

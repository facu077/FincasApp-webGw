import { IFinca } from 'app/shared/model/fincasMs/finca.model';

export interface ICosecha {
  id?: number;
  producto?: string;
  peso?: number;
  finca?: IFinca;
}

export class Cosecha implements ICosecha {
  constructor(public id?: number, public producto?: string, public peso?: number, public finca?: IFinca) {}
}

import { IFinca } from 'app/shared/model/fincasMs/finca.model';
import { TipoHerramienta } from 'app/shared/model/enumerations/tipo-herramienta.model';

export interface IHerramienta {
  id?: number;
  nombre?: string;
  tipo?: TipoHerramienta;
  descripcion?: string;
  finca?: IFinca;
}

export class Herramienta implements IHerramienta {
  constructor(
    public id?: number,
    public nombre?: string,
    public tipo?: TipoHerramienta,
    public descripcion?: string,
    public finca?: IFinca
  ) {}
}

import { Departamento } from 'app/shared/model/enumerations/departamento.model';

export interface IUbicacion {
  id?: number;
  departamento?: Departamento;
  calle?: string;
  numero?: number;
  descripcion?: string;
}

export class Ubicacion implements IUbicacion {
  constructor(
    public id?: number,
    public departamento?: Departamento,
    public calle?: string,
    public numero?: number,
    public descripcion?: string
  ) {}
}

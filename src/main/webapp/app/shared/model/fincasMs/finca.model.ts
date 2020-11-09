import { IUbicacion } from 'app/shared/model/fincasMs/ubicacion.model';
import { IEncargado } from 'app/shared/model/fincasMs/encargado.model';
import { ICampo } from 'app/shared/model/fincasMs/campo.model';
import { ICosecha } from 'app/shared/model/fincasMs/cosecha.model';
import { IHerramienta } from 'app/shared/model/fincasMs/herramienta.model';

export interface IFinca {
  id?: number;
  nombre?: string;
  userLogin?: string;
  ubicacion?: IUbicacion;
  encargado?: IEncargado;
  campos?: ICampo[];
  cosechas?: ICosecha[];
  herramientas?: IHerramienta[];
}

export class Finca implements IFinca {
  constructor(
    public id?: number,
    public nombre?: string,
    public userLogin?: string,
    public ubicacion?: IUbicacion,
    public encargado?: IEncargado,
    public campos?: ICampo[],
    public cosechas?: ICosecha[],
    public herramientas?: IHerramienta[]
  ) {}
}

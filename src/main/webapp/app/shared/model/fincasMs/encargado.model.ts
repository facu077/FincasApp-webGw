export interface IEncargado {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
}

export class Encargado implements IEncargado {
  constructor(public id?: number, public nombre?: string, public apellido?: string, public email?: string, public telefono?: string) {}
}

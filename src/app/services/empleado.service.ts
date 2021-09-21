import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor( private firestone: AngularFirestore ) { }

  agregarEmpleado(empleado: any): Promise<any>{
    return this.firestone.collection('empleados').add(empleado);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor( private firestone: AngularFirestore ) { }

  agregarEmpleado(empleado: any): Promise<any>{
    return this.firestone.collection('empleados').add(empleado);
  }

  getEmpleados(): Observable<any>{
    /**
     * En el metodo snapshotChanges sirve para que cada ves que se haga
     * un cambio, se vea en tiempo real
     */
    return this.firestone.collection('empleados', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any>{
    return this.firestone.collection('empleados').doc(id).delete();
  }

  actualizarEmpleado(id: string): Observable<any>{
    return this.firestone.collection('empleados').doc(id).snapshotChanges();
  }

  upgradeEmployee(id: string, data: any):Promise<any>{
    return this.firestone.collection('empleados').doc(id).update(data);
  }
}

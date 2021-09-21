import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor( private fb: FormBuilder, 
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.editarEmpleado();
  }

  agregarEditarEmpleado(){
    this.submitted = true;
    if(this.createEmpleado.invalid){
      return;
    }

    if(this.id === null){
      this.agregarEmpleado();
    }else{
      this.editEmpleado(this.id);
    }
    
  }

  agregarEmpleado(){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;

    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      this.toastr.success(`El empleado fue registrado con exito`,`Empleado Registrado`, {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-empleado']);
    }).catch(error =>{
      console.log(error);
      this.loading = false;
    })
  }

  editEmpleado(id: string){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.upgradeEmployee(id, empleado).then(() =>{
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito','Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleado']);
    });
  }

  editarEmpleado(){
    this.titulo = 'Editar Empleado';
    if(this.id !== null){
      this.loading = true;
      this._empleadoService.actualizarEmpleado(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario']
        })
      })
    }
  }

}

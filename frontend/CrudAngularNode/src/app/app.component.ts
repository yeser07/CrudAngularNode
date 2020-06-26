
import { Component, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from './app.service';
import { Productos } from '../model/productos';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('closeProductosForm') closeProductosForm;
  @ViewChild('openProductosForm') openProductosForm;
  
  title = 'CrudAngularNode';


  public listaProductos:Array<any>=[];
  public registroProducto:Productos;
  constructor(private appService:AppService) {
    this.registroProducto = new Productos();

  }

  ngOnInit(): void {
    this.ObtenerListaProductos();
  }

  public ObtenerListaProductos() {
    this.appService.getProductos().subscribe(data => {
      console.log(data);
      this.listaProductos = data;
    });
  }



	guardarProducto(form){

   if(!this.registroProducto._id){
     // Guardar datos básicos
		this.appService.guardarProducto(this.registroProducto).subscribe(
			data => {
			
						//this.saveProducto = data.registroProducto;
						Swal.fire({
              icon: 'success',
              title: 'Operacion Exitosa',
              text: 'Se registro el Producto Correctamente!',
            })
            this.ObtenerListaProductos();
			},
			error => {
        Swal.fire({
          icon: 'error',
          title: 'Operacion genero Error',
          text: error
        })
			}
		);
   }else{
    this.appService.editarProducto(this.registroProducto).subscribe(
      data => {
        console.log(data);
        if (data.class==='success'){
          Swal.fire({
            icon: 'success',
            title: 'Operacion Exitosa',
            text: 'Se ha actualizado el Producto Correctamente!',
          })
          this.ObtenerListaProductos();

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message
          })
          
        }
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Operacion genero Error',
            text: error
          })
        }
      );
   }
		
		
	}

  eliminarProducto(id){
  	this.appService.eliminarProducto(id).subscribe(
  		data => {
  			if(data.class ==='success'){
  				Swal.fire({
            icon: 'success',
            title: 'Operacion Exitosa',
            text: 'Se ha eliminado el Producto Correctamente!',
          })
          this.ObtenerListaProductos();
  			}
  		},
  		error => {
  			Swal.fire({
          icon: 'error',
          title: 'Operacion genero Error',
          text: error
        })
  		}
  	);
  }




  
  ObtenerProducto(id) {
    this.appService.obtenerProducto(id).subscribe(data => {
      console.log(data);
      this.registroProducto = data;
    }, (err) => console.error(err));
  }


}

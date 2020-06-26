import { Injectable } from '@angular/core';

import { Productos } from '../model/productos';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AppService {
  api_url='http://localhost:3000';

  
  constructor(private http: HttpClient) { }


  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api_url}/obtenerLista`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  guardarProducto(producto: Productos): Observable<any>{
		let params = JSON.stringify(producto);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this.http.post(`${this.api_url}/crear`, params, {headers: headers});
  }
  

  eliminarProducto(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this.http.delete(`${this.api_url}/eliminar/`+ id, {headers: headers});
  }

  obtenerProducto(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this.http.get(`${this.api_url}/obtener/`+ id, {headers: headers});
	}
  
  editarProducto(producto): Observable<any>{
		let params = JSON.stringify(producto);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this.http.put(`${this.api_url}/editar/`+ producto._id, params, {headers: headers});
	}






  private handleError( error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent){
      console.error('An error occurred', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happended; please retry again later.');
  };






}

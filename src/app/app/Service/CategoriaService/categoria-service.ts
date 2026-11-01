import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../Models/Categoria';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    constructor (private http: HttpClient){}

    listarCategorias(): Observable<Categoria[]>{
        const urlApi = `https://localhost:7169/api/Categorium`

        return this.http.get<Categoria[]>(urlApi)
    }
}

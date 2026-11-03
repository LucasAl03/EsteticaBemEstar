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

    cadastrarCategoria(categoria: Categoria): Observable<Categoria>{
        const urlApi = `https://localhost:7169/api/Categorium`

        return this.http.post<Categoria>(urlApi, categoria)
    }

    listarCategoria(categoriaId: number): Observable<Categoria>{
        const urlApi = `https://localhost:7169/api/Categorium/${categoriaId}`

        return this.http.get<Categoria>(urlApi)
    }

    alterarCategoria(categoria: Categoria): Observable<Categoria>{
        const urlApi = `https://localhost:7169/api/Categorium/${categoria.idCategoria}`

        return this.http.put<Categoria>(urlApi, categoria)
    }

    excluirCategoria(idCategoria: number): Observable<void>{
        const urlApi = `https://localhost:7169/api/Categorium/${idCategoria}`

        return this.http.delete<void>(urlApi)
    }
}

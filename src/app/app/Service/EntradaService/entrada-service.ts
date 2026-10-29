import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrada } from '../../Models/Entrada';

@Injectable({
    providedIn: 'root'
})
export class entradaService {
    constructor (private http: HttpClient){}

    cadastrarEntrada(produto: Entrada): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque`

        return this.http.post<Entrada>(urlApi, produto)
    }

    listarEntradas(): Observable<Entrada[]>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/`

        return this.http.get<Entrada[]>(urlApi)
    }

    listarEntrada(produtoId: number): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/${produtoId}`

        return this.http.get<Entrada>(urlApi)
    }

    alterarEntrada(produto: Entrada): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/${produto.IdEntradaProduto}`

        return this.http.put<Entrada>(urlApi, produto)
    }

    excluirEntrada(produto: Entrada): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/${produto.IdEntradaProduto}`

        return this.http.delete<Entrada>(urlApi)
    }
}

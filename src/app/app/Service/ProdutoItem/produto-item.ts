import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../Models/Produto';

@Injectable({
    providedIn: 'root'
})
export class ProdutoItem {
    constructor (private http: HttpClient){}

    cadastrarPessoa(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem`

        return this.http.post<Produto>(urlApi, produto)
    }

    listarPessoas(): Observable<Produto[]>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/`

        return this.http.get<Produto[]>(urlApi)
    }

    listarPessoa(produtoId: number): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produtoId}`

        return this.http.get<Produto>(urlApi)
    }

    alterarPessoa(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produto.iditem}`

        return this.http.put<Produto>(urlApi, produto)
    }

    excluirPessoa(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produto.iditem}`

        return this.http.delete<Produto>(urlApi)
    }
}
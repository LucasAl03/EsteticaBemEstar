import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Produto } from '../../Models/Produto';

@Injectable({
    providedIn: 'root'
})
export class ProdutoItem {
    constructor (private http: HttpClient){}

    cadastrarProduto(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem`

        return this.http.post<Produto>(urlApi, produto)
    }

    listarProdutos(): Observable<Produto[]>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/`

        return this.http.get<Produto[]>(urlApi)
    }

    listarProduto(produtoId: number): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produtoId}`

        return this.http.get<Produto>(urlApi)
    }

    alterarProduto(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produto.idItem}`

        return this.http.put<Produto>(urlApi, produto)
    }

    excluirProduto(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produto.idItem}`

        return this.http.delete<Produto>(urlApi)
    }
}
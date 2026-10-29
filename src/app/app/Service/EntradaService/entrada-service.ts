import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrada } from '../../Models/Entrada';

@Injectable()
export class EntradaService {
    constructor (private http: HttpClient){}

    cadastrarPessoa(produto: Entrada): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque`

        return this.http.post<Entrada>(urlApi, produto)
    }

    listarPessoas(): Observable<Entrada[]>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/`

        return this.http.get<Entrada[]>(urlApi)
    }

    listarPessoa(produtoId: number): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/${produtoId}`

        return this.http.get<Entrada>(urlApi)
    }

    alterarPessoa(produto: Entrada): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/${produto.IdEntradaProduto}`

        return this.http.put<Entrada>(urlApi, produto)
    }

    excluirPessoa(produto: Entrada): Observable<Entrada>{
        const urlApi = `https://localhost:7169/api/EntradaProdEstoque/${produto.IdEntradaProduto}`

        return this.http.delete<Entrada>(urlApi)
    }
}

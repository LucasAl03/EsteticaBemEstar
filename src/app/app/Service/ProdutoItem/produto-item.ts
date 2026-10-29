import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Produto } from '../../Models/Produto';
import { ProdutoApi } from '../../Models/ProdutoApi';

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

        return this.http.get<ProdutoApi[]>(urlApi)
        .pipe(map(lista => lista.map(api => this.paraProduto(api))))
    }

    listarProduto(produtoId: number): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produtoId}`

        return this.http.get<Produto>(urlApi)
    }

    alterarProduto(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produto.IdItem}`

        return this.http.put<Produto>(urlApi, produto)
    }

    excluirProduto(produto: Produto): Observable<Produto>{
        const urlApi = `https://localhost:7169/api/ProdutoItem/${produto.IdItem}`

        return this.http.delete<Produto>(urlApi)
    }

    private paraProduto(api: ProdutoApi): Produto {
        const p = new Produto()
        p.IdItem = api.idItem
        p.IdCategoria = api.idCategoria
        p.Item = api.item
        p.DescricaoItem = api.descricaoItem
        p.Preco = api.preco
        p.TipoItem = api.tipoItem
        p.AtivoProdutoServico = api.ativoProdutoServico
        p.PrecoVenda = api.produto?.precoVenda ?? null
        p.Unidade = api.produto?.unidade ?? ''
        p.CodigoPreco = api.produto?.codigoPreco ?? null
        return p
      }
}
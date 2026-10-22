import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../../Models/Pessoa';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class PessoaService {
    constructor (private http: HttpClient){}

    cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa>{
        const urlApi = ''

        return this.http.post<Pessoa>(urlApi, pessoa)
    }

    listarPessoas(): Observable<Pessoa[]>{
        const urlApi = ''

        return this.http.get<Pessoa[]>(urlApi)
    }

    listarPessoa(pessoaId: number): Observable<Pessoa>{
        const urlApi = ``

        return this.http.get<Pessoa>(urlApi)
    }

    alterarPessoa(pessoa: Pessoa): Observable<Pessoa>{
        const urlApi = ''

        return this.http.put<Pessoa>(urlApi, pessoa)
    }

    excluirPessoa(pessoa: Pessoa): Observable<Pessoa>{
        const urlApi = ''

        return this.http.delete<Pessoa>(urlApi)
    }
}

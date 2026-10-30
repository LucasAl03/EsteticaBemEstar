import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FuncionarioService {
    constructor (private http: HttpClient){}

    cadastrarFuncionario(pessoa: PessoaFuncionario): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/FuncionarioEndereco`

        return this.http.post<PessoaFuncionario>(urlApi, pessoa)
    }

    listarFuncionarios(): Observable<PessoaFuncionario[]>{
        const urlApi = `https://localhost:7169/api/FuncionarioEndereco/`

        return this.http.get<PessoaFuncionario[]>(urlApi)
    }

    listarFuncioanrio(pessoaId: number): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/FuncionarioEndereco/${pessoaId}`

        return this.http.get<PessoaFuncionario>(urlApi)
    }

    alterarFuncionario(pessoa: PessoaFuncionario): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/FuncionarioEndereco/${pessoa.idPessoa}`

        return this.http.put<PessoaFuncionario>(urlApi, pessoa)
    }

    excluirFuncionario(pessoa: PessoaFuncionario): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/FuncionarioEndereco/${pessoa.idPessoa}`

        return this.http.delete<PessoaFuncionario>(urlApi)
    }
}

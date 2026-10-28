import { HttpClient } from '@angular/common/http';
import { Service } from '@angular/core';
import { PessoaFuncionario } from '../../Models/PessoaFuncionario';
import { Observable } from 'rxjs';

@Service()
export class FuncionarioService {
    constructor (private http: HttpClient){}

    cadastrarPessoa(pessoa: PessoaFuncionario): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/PessoaEndereco`

        return this.http.post<PessoaFuncionario>(urlApi, pessoa)
    }

    listarPessoas(): Observable<PessoaFuncionario[]>{
        const urlApi = `https://localhost:7169/api/PessoaEndereco/`

        return this.http.get<PessoaFuncionario[]>(urlApi)
    }

    listarPessoa(pessoaId: number): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/PessoaEndereco/${pessoaId}`

        return this.http.get<PessoaFuncionario>(urlApi)
    }

    alterarPessoa(pessoa: PessoaFuncionario): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/PessoaEndereco/${pessoa.IdPessoa}`

        return this.http.put<PessoaFuncionario>(urlApi, pessoa)
    }

    excluirPessoa(pessoa: PessoaFuncionario): Observable<PessoaFuncionario>{
        const urlApi = `https://localhost:7169/api/PessoaEndereco/${pessoa.IdPessoa}`

        return this.http.delete<PessoaFuncionario>(urlApi)
    }
}

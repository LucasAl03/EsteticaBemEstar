import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../../Models/Endereco';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnderecoService {
    constructor (private http: HttpClient){}

    cadastrarEndereco(pessoa: Endereco): Observable<Endereco>{
        const urlApi = `https://localhost:7169/api/PessoaEndereco`
    
        return this.http.post<Endereco>(urlApi, pessoa)
    }
    
    listarEnderecos(): Observable<Endereco[]>{
        const urlApi = `https://localhost:7169/api/Endereco/`
    
        return this.http.get<Endereco[]>(urlApi)
    }
    
    listarEndereco(enderecoId: number): Observable<Endereco>{
        const urlApi = `https://localhost:7169/api/Endereco/${enderecoId}`
    
        return this.http.get<Endereco>(urlApi)
    }
    
    alterarEndereco(endereco: Endereco): Observable<Endereco>{
        const urlApi = `https://localhost:7169/api/Endereco/${endereco.idEndereco}`
    
        return this.http.put<Endereco>(urlApi, endereco)
    }
    
    excluirEndereco(idPessoa: number): Observable<void>{
        const urlApi = `https://localhost:7169/api/Endereco/${idPessoa}`
    
        return this.http.delete<void>(urlApi)
    }
}

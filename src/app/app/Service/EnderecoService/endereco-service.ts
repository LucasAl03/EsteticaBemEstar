import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../../Models/Endereco';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EnderecoService {
    constructor (private http: HttpClient){}

    cadastrarEndereco(endereco: Endereco): Observable<Endereco>{
        const urlApi = ''

        return this.http.post<Endereco>(urlApi, endereco)
    }

    listarPessoas(): Observable<Endereco[]>{
        const urlApi = ''

        return this.http.get<Endereco[]>(urlApi)
    }

    listarEndereco(enderecoId: number): Observable<Endereco>{
        const urlApi = ``

        return this.http.get<Endereco>(urlApi)
    }

    alterarEndereco(endereco: Endereco): Observable<Endereco>{
        const urlApi = ''

        return this.http.put<Endereco>(urlApi, endereco)
    }

    excluirEndereco(endereco: Endereco): Observable<Endereco>{
        const urlApi = ''

        return this.http.delete<Endereco>(urlApi)
    }
}

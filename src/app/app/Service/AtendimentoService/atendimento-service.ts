import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendimento } from '../../Models/Atendimento';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AtendimentoService {
        constructor (private http: HttpClient){}

    cadastrarAtendimento(pessoa: Atendimento): Observable<Atendimento>{
        const urlApi = `https://localhost:7169/api/Atendimento`
    
        return this.http.post<Atendimento>(urlApi, pessoa)
    }
    
    listarAtendimentos(): Observable<Atendimento[]>{
        const urlApi = `https://localhost:7169/api/Atendimento/`
    
        return this.http.get<Atendimento[]>(urlApi)
    }
    
    listarAtendimento(atendimentoId: number): Observable<Atendimento>{
        const urlApi = `https://localhost:7169/api/Atendimento/${atendimentoId}`
    
        return this.http.get<Atendimento>(urlApi)
    }
    
    alterarAtendimento(atendimento: Atendimento): Observable<Endereco>{
        const urlApi = `https://localhost:7169/api/Atendimento/${atendimento.idAtendimento}`
    
        return this.http.put<Atendimento>(urlApi, atendimento)
    }
    
    excluirAtendimento(idAtendimento: number): Observable<void>{
        const urlApi = `https://localhost:7169/api/Atendimento/${idAtendimento}`
    
        return this.http.delete<void>(urlApi)
    }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../../Service/FuncionarioService/funcionario-service';
import { PessoaFuncionario } from '../../../Models/PessoaFuncionario';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-funcionario',
  styleUrl: './funcionario.css',
  templateUrl: './funcionario.html',
})
export class Funcionario implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private funcionarioService: FuncionarioService, private route: ActivatedRoute){}

  pessoa: PessoaFuncionario[] = []

  ngOnInit(){
    this.carregaFuncionarios();
  }

  carregaFuncionarios(){
    this.funcionarioService.listarFuncionarios()
      .subscribe({
        next: (lista) => {
          console.log(lista)
          this.pessoa = lista.filter(f => f.funcionario)
          this.cdr.detectChanges()
        },
        error: (erro) => console.log('Erro ao listar os funcionarios', erro)
      })
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../../../Service/FuncionarioService/funcionario-service';
import { PessoaFuncionario } from '../../../Models/PessoaFuncionario';

@Component({
  imports: [],
  selector: 'app-funcionario',
  styleUrl: './funcionario.css',
  templateUrl: './funcionario.html',
})
export class Funcionario implements OnInit {
  constructor (private cdr: ChangeDetectorRef, private funcionarioService: FuncionarioService, private route: ActivatedRoute){}

  funcionarios: PessoaFuncionario[] = []

  ngOnInit(){
    this.carregaFuncionarios();
  }

  carregaFuncionarios(){
    this.funcionarioService.listarFuncionarios()
      .subscribe({
        next: (lista) => {
          this.funcionarios = lista
          this.cdr.detectChanges()
        },
        error: (erro) => console.log('Erro ao listar os funcionarios', erro)
      })
  }
}

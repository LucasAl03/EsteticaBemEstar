import { Endereco } from "./Endereco"
import { Funcionario } from "./Funcionario"

export class PessoaFuncionario {
    IdPessoa: number = 0
    Nome: string = ''
    CPF: string = ''
    DataNascimento: string = ''
    Sexo: string = ''
    Email: string = ''
    Telefone: string = ''
    Enderecos: Endereco[] = []
    Funcionarios: Funcionario[] = []
}
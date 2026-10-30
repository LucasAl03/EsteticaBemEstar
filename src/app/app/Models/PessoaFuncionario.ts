import { Endereco } from "./Endereco"
import { Funcionario } from "./Funcionario"

export class PessoaFuncionario {
    idPessoa: number = 0
    nome: string = ''
    cpf: string = ''
    dataNascimento: string = ''
    sexo: string = ''
    email: string = ''
    telefone: number | null = null
    ativoPessoa: string = ''
    Enderecos: Endereco[] = []
    Funcionarios: Funcionario[] = []
}
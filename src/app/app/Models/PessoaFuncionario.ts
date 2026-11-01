import { Endereco } from "./Endereco"
import { FuncionarioCargo } from "./FuncionarioCargo"

export class PessoaFuncionario {
    idPessoa: number = 0
    nome: string = ''
    cpf: string = ''
    dataNascimento: string = ''
    sexo: string = ''
    email: string = ''
    telefone: number | null = null
    ativoPessoa: string = ''
    enderecos: Endereco[] = []
    funcionario: FuncionarioCargo | null = null
}
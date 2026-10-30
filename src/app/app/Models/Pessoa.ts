import { Endereco } from "./Endereco"

export class Pessoa {
    idPessoa: number = 0
    nome: string = ''
    cpf: string = ''
    dataNascimento: string = ''
    sexo: string = ''
    email: string = ''
    telefone: number | null = null 
    ativoPessoa: string = ''
    Enderecos: Endereco[] = []
}
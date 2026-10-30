import { Endereco } from "./Endereco"

export class Pessoa {
    IdPessoa: number = 0
    Nome: string = ''
    CPF: string = ''
    DataNascimento: string = ''
    Sexo: string = ''
    Email: string = ''
    Telefone: number | null = null 
    AtivoPessoa: string = ''
    Enderecos: Endereco[] = []
}
import { on } from "events"

export class Pessoa {
    IdPessoa: number = 0
    Nome: string = ''
    CPF: string = ''
    DataNascimento: Date | null = null
    Sexo: string = ''
    Email: string = ''
    Telefone: bigint = 0n
}
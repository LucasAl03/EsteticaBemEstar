export class Atendimento{
    idAtendimento: number = 0
    nomePessoa: string = ''
    idPessoa: number = 0
    dataAtendimento: string = ''
    itens: AtendimentoItem[] = []
}

export class AtendimentoItem{
    idAtendimento: number = 0
    idItem: number = 0
    item: string = ''
    idFuncionario: string = ''
    nomeFuncionario: string = ''
    cargo: string = ''
    quantidade: number = 0
    valorUnitario: number = 0
}
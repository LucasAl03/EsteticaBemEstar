import { Injectable, computed, signal } from '@angular/core';

export interface Sessao {
  idPessoa: number;
  nome: string;
  funcionario: boolean;
  cargo: string | null;
}

@Injectable({ 
    providedIn: 'root' 
})
export class SessaoService {
  private readonly CHAVE = 'sessao';

  // Estado em memória: quem estiver lendo (menu, guards) reage às mudanças
  private sessaoAtual = signal<Sessao | null>(this.lerStorage());

  // Somente leitura para os componentes
  readonly sessao = this.sessaoAtual.asReadonly();
  readonly logado = computed(() => this.sessaoAtual() !== null);
  readonly ehFuncionario = computed(() => this.sessaoAtual()?.funcionario === true);
  readonly cargo = computed(() => this.sessaoAtual()?.cargo ?? null);
  readonly nome = computed(() => this.sessaoAtual()?.nome ?? null)  
  

  iniciarSessao(dados: Sessao): void {
    try {
      sessionStorage.setItem(this.CHAVE, JSON.stringify(dados));
    } catch (erro) {
      console.log('Não foi possível salvar a sessão', erro);
    }
    this.sessaoAtual.set(dados);
  }

  encerrarSessao(): void {
    try {
      sessionStorage.removeItem(this.CHAVE);
    } catch (erro) {
      console.log('Não foi possível limpar a sessão', erro);
    }
    this.sessaoAtual.set(null);
  }

  // Lê o storage ao iniciar, para a sessão sobreviver ao F5
  private lerStorage(): Sessao | null {
    try {
      const texto = sessionStorage.getItem(this.CHAVE);
      if (!texto) return null;

      const dados = JSON.parse(texto) as Sessao;

      // Descarta se o conteúdo estiver corrompido ou adulterado
      if (typeof dados?.idPessoa !== 'number' || typeof dados?.funcionario !== 'boolean' || typeof dados.nome !== 'string') {
        sessionStorage.removeItem(this.CHAVE);
        return null;
      }
      return dados;
    } catch {
      return null;
    }
  }
}
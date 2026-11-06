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
  readonly nome = computed(() => this.sessaoAtual()?.nome ?? null);

  iniciarSessao(dados: Sessao): void {
    // Normaliza antes de salvar, assim o que vai pro storage sempre passa na leitura
    const normalizada = this.normalizar(dados);

    if (!normalizada) {
      console.warn('Dados de sessão inválidos, sessão não iniciada:', dados);
      return;
    }

    try {
      sessionStorage.setItem(this.CHAVE, JSON.stringify(normalizada));
    } catch (erro) {
      console.log('Não foi possível salvar a sessão', erro);
    }
    this.sessaoAtual.set(normalizada);
  }

  encerrarSessao(): void {
    try {
      sessionStorage.removeItem(this.CHAVE);
    } catch (erro) {
      console.log('Não foi possível limpar a sessão', erro);
    }
    try {
      localStorage.removeItem(this.CHAVE);
    } catch (erro) {
      console.log('Não foi possível limpar o localStorage', erro);
    }
    this.sessaoAtual.set(null);
  }

  // Lê o storage ao iniciar, para a sessão sobreviver ao F5
  private lerStorage(): Sessao | null {
    try {
      const texto = sessionStorage.getItem(this.CHAVE);
      if (!texto) return null;

      const normalizada = this.normalizar(JSON.parse(texto));

      if (!normalizada) {
        console.warn('Sessão salva descartada por formato inválido:', texto);
        sessionStorage.removeItem(this.CHAVE);
        return null;
      }
      return normalizada;
    } catch {
      return null;
    }
  }

  // Converte para o formato esperado ou devolve null se faltar o essencial
  private normalizar(dados: any): Sessao | null {
    const idPessoa = Number(dados?.idPessoa);

    if (!dados || Number.isNaN(idPessoa)) return null;

    return {
      idPessoa,
      nome: String(dados.nome ?? ''),
      funcionario: Boolean(dados.funcionario),
      cargo: dados.cargo ?? null,
    };
  }
}
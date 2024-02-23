import { ActivatedRoute } from '@angular/router';

export enum Acao {
  LISTAR = 'listar',
  INCLUIR = 'incluir',
  ALTERAR = 'alterar',
  CONSULTAR = 'consultar',
  CADASTROEXTERNO = 'cadastrarExterno',
}

/**
 * Classe de controle 'Ação'.
 *
 */
export class AcaoSistema {
  private acao: Acao;

  /**
   * Construtor da classe.
   *
   * @param route
   */
  constructor(route?: ActivatedRoute) {
    if (route) {
      this.acao = route.snapshot.data['acao'];
    }
  }

  /**
   * Seta o valor da ação vigente.
   *
   * @param acao
   */
  public setAcao(acao: Acao): AcaoSistema {
    this.acao = acao;
    return this;
  }

  /**
   * Verifica se ação é referente a 'INCLUIR'.
   *
   * @return boolean
   */
  public isAcaoIncluir(): boolean {
    return Acao.INCLUIR === this.acao;
  }

  /**
   * Verifica se ação é referente a 'ALTERAR'.
   *
   * @return boolean
   */
  public isAcaoAlterar(): boolean {
    return Acao.ALTERAR === this.acao;
  }

  /**
   * Verifica se ação é referente a 'LISTAR'.
   *
   * @return boolean
   */
  public isAcaoListar(): boolean {
    return Acao.LISTAR === this.acao;
  }

  /**
   * Verifica se ação é referente a 'CONSULTAR'.
   *
   * @return boolean
   */
  public isAcaoConsultar(): boolean {
    return Acao.CONSULTAR === this.acao;
  }

  /**
   * Verifica se ação é referente a cadastrar um usuario externo
   *
   * @return boolean
   */
  public isAcaoCadastrarExterno(): boolean {
    return Acao.CADASTROEXTERNO === this.acao;
  }
}

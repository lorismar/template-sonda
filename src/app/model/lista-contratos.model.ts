export interface PesquisaContrato {
    idContrato:number
    nomeFornecedor?: string;
    objeto: string;
    numeroProcesso?: string;
    nomeGestor?: string;
    unidade?: string;
    valorTotal?: number;
    numeroContrato?: string;
    dataFim?: string;
    processos: string;
    dataInicioVigencia: string;
    dataFimVigencia: string;
    tipoContrato: string;
    nome?: string;
    status: string;
    anoContrato: string | number;
  }
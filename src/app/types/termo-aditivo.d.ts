export type Processo = {
    idProcesso: number;
    numeroProcesso: string;
    anoProcesso: string;
  };
  
export type TermoAditivo = {
    idTermoAditivo: number;
    idContrato: number;
    numeroContrato: string;
    numero: string;
    ano: number;
    codigoUnidadeOrcamentaria: string;
    dataAssinatura: string;
    dataPublicacao: string;
    localPublicacao: string;
    linkPublicacao: string;
    numeroProcessoSei: string;
    anoProcessoSei: number;
    status: string;
    valorReajuste: number;
  };

 export type Map = {
    [key: string]: any;
  };

  
export type Item = {
  item: number;
  grupo: string;
  valorUnitario: number;
  descricao: string;
  idItemQuadroDemos?: number;
  quantidadeOriginal: number;
  quantidadeAdicional: number;
  quantidadeReservada: number;
  valorTotal: number;
  unidade: string;
  quantidadeSupressao: number;
  quantidade: number;
  saldo: number;
  valorUnitarioOriginal: number;
  valorTotalOriginal: number;
  idItemQuadroDemosOriginal?: number;
}
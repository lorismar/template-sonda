export class GarantiasModel {
  garantiaContratual: string = 'S';
  dataPrazoVigencia: string;
  modalidadeGarantia: string;
  prazoGarantia?: number;
  tipoPrazoGarantia: string;
  percentual?: number;
  valor?: number;
  prazoGarantiaAjustavel: string = 'S';
  marcoInicial: string;
  prazoApresentacaoGarantia?: number;
  dataLimiteApresentacao: string;
  prazoProrrogacaoApresentacaoGarantia: string = 'S';
  quantidadeDiasUteisProrrogacao?: number = 0;
  dataLimiteProrrogacao: string;
  idContrato: number;
  }
  
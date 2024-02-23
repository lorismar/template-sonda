import { RecebimentoDefinitivoEnum } from '../components/shared/enums/recebimento-definitivo.enum';
import { TipoPrazoEnum } from '../components/shared/enums/tipo-prazo.enum';
import { SimNaoEnum } from '../components/shared/enums/sim-nao.enum';

export class DatasPrazosModel {
  idDataPrazo: string = '';
  dataApresentacaoProposta: string = '';
  dataAssinaturaContrato: string = '';
  prazoReuniaoAlinhamento: number = 0;
  prazoEntrega: number = 0;
  dataLimiteEntrega: string = '';
  prazoRecebimentoProvisorio: number = 0;
  prazoRecebimentoDefinitivo: number = 0;
  dataLimiteRecebimento: string = '';
  recebimentoDefinitivo: RecebimentoDefinitivoEnum;
  prazoPagamento: number = 0;
  dataLimitePagamento: string = '';
  continuado: SimNaoEnum;
  dataInicioVigencia: string = '';
  dataFimVigencia: string = '';
  prazoMaximoVigencia: number = 0;
  tipoPrazoMaximoVigencia: TipoPrazoEnum;
  prazoVigencia: number = 0;
  tipoPrazoVigencia: TipoPrazoEnum;
  dataLimiteProrogacao: string = '';
  garantiaContratual: string = "S";
  prazoGarantia: number = 0;
  tipoPrazoGarantia: TipoPrazoEnum;
  idContrato: number;
}

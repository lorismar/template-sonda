import { ModalidadeEmpenhoEnum } from '../components/shared/enums/modalidade.enum';
import { TipoEmpenhoEnum } from '../components/shared/enums/tipo-empenho.enum';
import { DocumentoOrigemEnum } from '../components/shared/enums/documento-origem.enum';

export class EmpenhoModel {
  idEmpenho: string = '';
  numero: string = '';
  valor: number = 0;
  descricaoProjeto: string = '';
  modalidade: ModalidadeEmpenhoEnum;
  tipo: TipoEmpenhoEnum;
  fonte: string;
  funcionalProgramatica: string = '';
  pa: string;
  elementoDespesa: string;
  documentoOrigem: DocumentoOrigemEnum;
  idContrato: any;
}

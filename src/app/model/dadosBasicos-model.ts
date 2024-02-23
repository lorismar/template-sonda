import { ProcessosDadosBasicos } from "./dadosBasicos-processos-model";

export class DadosBasicosModel {
    processos: ProcessosDadosBasicos[];
    modalidadeLicitacao: string = '';
    tipoContrato: string = 'SIMPLIFICADO';
    tipoContratacao: string = '';
    numeroContrato: string = '';
    razaoSocialFornecedor: string = '';
    cpfCnpj: string = '';
    objeto: string = '';
    infoComplementar: string = '';
    valorTotal: number;
    mesIndiceCorrecao: string = '';
    indiceCorrecao: string = '';
    codigoUnidadeOrcamentaria: string = '';
    simplificado: string = '';
    contrato: string = '';  
    cadastroFinalizado: string = '';
    numeroAtaRegistroPrecos: number;
    permitirSubContratacao: string = 'S';
    dataPublicacaoContrato: Date;
    localPublicacaoContrato: string = '';
    numeroInstrumentoConvocatorio: number;
    anoInstrumentoConvocatorio: number;
    status: string;
}
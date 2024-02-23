export enum TipoEmpenhoEnum {
  ORIGINAL = 'ORIGINAL',
  REFORCO = 'REFORCO',
  ANULACAO_PARCIAL = 'ANULACAO_PARCIAL',
  ANULACAO_TOTAL = 'ANULACAO_TOTAL',
}

export const TipoEmpenhoEnumLabel = {
  [TipoEmpenhoEnum.ORIGINAL]: 'Original',
  [TipoEmpenhoEnum.REFORCO]: 'Reforço',
  [TipoEmpenhoEnum.ANULACAO_PARCIAL]: 'Anulação Parcial',
  [TipoEmpenhoEnum.ANULACAO_TOTAL]: 'Anulação Total',
};

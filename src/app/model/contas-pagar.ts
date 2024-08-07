export interface ContasPagar {
  oidContas: number;
  valPagar: number;
  valDesconto: number;
  valJurosMulta: number;
  valPago: number;
  cliente: string;
  centroCusto: string;
  dtEmissao: string;
  dtVencimento: string;
  dtPagamento: string;
  observacao: string;
}

export interface PaginacaoContasPagar {
  content: ContasPagar[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

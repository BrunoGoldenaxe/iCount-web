export interface ContasReceber {
  oidContas: number;
  valReceber: number;
  valDesconto: number;
  valJurosMulta: number;
  valRecebido: number;
  cliente: string;
  centroCusto: string;
  dtEmissao: string;
  dtVencimento: string;
  dtRecebimento: string;
  observacao: string;
}

export interface PaginacaoContasReceber {
  content: ContasReceber[];
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

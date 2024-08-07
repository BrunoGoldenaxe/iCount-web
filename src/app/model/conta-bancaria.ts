export interface ContaBancaria {
  oidConta: number;
  saldoInicial: number;
  saldo: number;
  nmBanco: string;
  nrAgencia: string;
  nrConta: string;
  dtUltAlter: Date;
}

export interface PaginacaoContaBancaria {
  content: ContaBancaria[];
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

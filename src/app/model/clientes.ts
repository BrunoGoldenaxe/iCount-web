export interface Clientes {
  oidCliente: number,
  razaoSocial: string,
  email: string,
  telefone: string,
  cnpj: string,
  cpf: string,
  inscMunicipal: string,
  inscEstadual: string,
  bairro: string,
  cep: string,
  cidade: string,
  complemento: string,
  logradouro: string,
  numero: number,
  pais: string,
  estado: string,
  observacao: string,
  ativo: boolean;
}

export interface PaginacaoClientes {
  content: Clientes[];
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

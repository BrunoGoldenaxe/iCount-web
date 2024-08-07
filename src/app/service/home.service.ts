import { ContaBancaria, PaginacaoContaBancaria } from '../model/conta-bancaria';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, first, Observable } from 'rxjs';
import { PaginacaoContasPagar } from '../model/contas-pagar';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

private readonly API = 'api/banco';
private readonly contasPagarAPI = 'api/contas-pagar'

constructor(private httpClient: HttpClient) { }

getBancosPaged(
  page: number,
  size: number = 5
): Observable<PaginacaoContaBancaria> {
  let params = new HttpParams();
  params = params.append("page", page.toString());
  params = params.append("size", size.toString());

  return this.httpClient.get<PaginacaoContaBancaria>(
    `${this.API}/listar-bancos-paginados`, { params }
  );
}

getContasPagarPaginatedBetweenDates(
  page: number,
  size: number = 5
): Observable<PaginacaoContasPagar> {
  let params = new HttpParams();
  params = params.append("page", page.toString());
  params = params.append("size", size.toString());

  return this.httpClient.get<PaginacaoContasPagar>(
    `${this.contasPagarAPI}/listar-contas-pagar-paginadas-da-semana`, {params}
  );
}




}

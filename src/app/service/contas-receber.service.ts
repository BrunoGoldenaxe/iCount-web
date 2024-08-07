import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, first, Observable } from 'rxjs';
import { PaginacaoContasReceber, ContasReceber } from '../model/contas-receber';

@Injectable({
  providedIn: 'root'
})
export class ContasReceberService {

private readonly API = 'api/contas-receber';

constructor(private httpClient: HttpClient){}

getContasPaged(
  page: number,
  size: number = 5
): Observable<PaginacaoContasReceber> {
  let params = new HttpParams();
  params = params.append("page", page.toString());
  params = params.append("size", size.toString());

  return this.httpClient.get<PaginacaoContasReceber>(
    `${this.API}/listar-contas-receber-paginadas`, {params}
  );
}

getContasRecebidasPaged(
  page: number,
  size: number = 5
): Observable<PaginacaoContasReceber> {
  let params = new HttpParams();
  params = params.append("page", page.toString());
  params = params.append("size", size.toString());

  return this.httpClient.get<PaginacaoContasReceber>(
    `${this.API}/listar-contas-recebidas-paginadas`, {params}
  );
}

deleteContaById(oidContas: number): Observable<any>{
  return this.httpClient.delete<any>(
    `${this.API}/deletar-conta-por-id/${oidContas}`
  );
}

createContasReceber(record: Partial<ContasReceber>): Observable<any>{
  return this.httpClient.post<any>(
    `${this.API}/gravar-conta`, record
  ).pipe(first());
}






}

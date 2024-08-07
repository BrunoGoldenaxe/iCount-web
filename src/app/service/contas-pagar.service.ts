import { Injectable } from '@angular/core';
import { ContasPagar, PaginacaoContasPagar } from '../model/contas-pagar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, first, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContasPagarService {

  private readonly API = 'api/contas-pagar';

  constructor(private httpClient: HttpClient) { }

  getContasPaged(
    page: number,
    size: number = 5
  ): Observable<PaginacaoContasPagar> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("size", size.toString());

    return this.httpClient.get<PaginacaoContasPagar>(
     `${this.API}/listar-contas-pagar-paginadas`, { params }
    );
  }

  getContasPagasPaged(
    page: number,
    size: number = 5
  ): Observable<PaginacaoContasPagar> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("size", size.toString());

    return this.httpClient.get<PaginacaoContasPagar>(
      `${this.API}/listar-contas-pagas-paginadas`, { params }
     );
  }

  deleteContaById(oidContas: number): Observable<any>{
    return this.httpClient.delete<any>(
      `${this.API}/deletar-conta-por-id/${oidContas}`
    );
  }

  billPayment(record: ContasPagar): Observable<any>{
    return this.httpClient.post<any>(
      `${this.API}/pagamento-de-conta`, record
    );
  }

  createContasPagar(record: Partial<ContasPagar>): Observable<any>{
    return this.httpClient.post<any>(
      `${this.API}/gravar-conta`, record
    ).pipe(first());
  }
}

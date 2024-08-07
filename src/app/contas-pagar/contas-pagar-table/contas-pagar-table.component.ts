import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ContasPagarService } from 'src/app/service/contas-pagar.service';
import { MatTabGroup } from "@angular/material/tabs";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContasPagar } from '../../model/contas-pagar';
import { SnackBarService } from 'src/app/service/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-contas-pagar-table',
  templateUrl: './contas-pagar-table.component.html',
  styleUrls: ['./contas-pagar-table.component.scss']
})
export class ContasPagarTableComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  totalElements: number = 0;
  currentPage: number = 0;
  contasPagar$: ContasPagar[] = [];

  @ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns = [
    'cliente',
    'observacao',
    'centroCusto',
    'valPagar',
    'dtVencimento',
    'acoes'
  ];

  dataSource = new MatTableDataSource(this.contasPagar$);

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
    private contasPagarService: ContasPagarService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buscarContas(0);
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buscarContas(page: number){
    this.loading = true;
    this.contasPagarService.getContasPaged(page).subscribe({
      next: (data) => {
        this.loading = false;
        this.contasPagar$ = data.content;
        this.totalElements = data.totalElements;
        this.currentPage = page;
        this.dataSource = new MatTableDataSource(this.contasPagar$);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.loading = false;
        this.snackBarService.presentMatSnackbar(error.error.message, 'warning');
      },
    });
  }

  buscarContasPagas() {
    this.router.navigate(['../pagas'], {relativeTo: this.activatedRoute});
  }

  confirmarExclusaoConta(id: string){
    if (
      confirm(
        "Tem certeza de que deseja excluir a conta ? Ao confirmar a exclusão, os dados da mesma serão deletados."
      )
    ){
      this.contasPagarService.deleteContaById(+id).subscribe({
        next: (response) => {
          this.loading = false;
          this.buscarContas(0);
          this.router.navigate(['../lista'], {relativeTo: this.activatedRoute});
          this.snackBarService.presentMatSnackbar(response.message, 'success');
        },
        error: (error) => {
          console.error('Erro ao excluir a conta')
          this.snackBarService.presentMatSnackbar(error.error.message, 'danger');
        },
      });
    }
  }

  efetuarPagamento(idConta: string){
    if (
      confirm(
        "Tem certeza de que deseja efetuar o pagamento da conta ?"
      )
    ){
      this.contasPagarService.deleteContaById(+idConta).subscribe({
        next: (response) => {
          this.snackBarService.presentMatSnackbar(response.message, 'success');
          this.buscarContas(0);
          this.router.navigate(['../lista'], {relativeTo: this.activatedRoute});
        },
        error: (error) => {
          console.error('Erro ao efetuar o pagamento da conta')
          this.snackBarService.presentMatSnackbar(error.error.message, 'danger');
        },
      });
    }
  }

  editarConta(conta: ContasPagar){
    this.edit.emit(conta);
  }

  adicionarConta(){
    this.add.emit(true);
    this.router.navigate(['../nova'], {relativeTo: this.activatedRoute});
  }

  changePage(event: any) {
    this.buscarContas(event.pageIndex);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

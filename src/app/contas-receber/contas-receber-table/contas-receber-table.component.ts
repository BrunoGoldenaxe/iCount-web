import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasReceber } from 'src/app/model/contas-receber';
import { ContasReceberService } from 'src/app/service/contas-receber.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-contas-receber-table',
  templateUrl: './contas-receber-table.component.html',
  styleUrls: ['./contas-receber-table.component.scss']
})
export class ContasReceberTableComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  totalElements: number = 0;
  currentPage: number = 0;
  contasReceber$: ContasReceber[] = [];

  @ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns = [
    'cliente',
    'observacao',
    'centroCusto',
    'valReceber',
    'dtVencimento',
    'acoes'
  ];

  dataSource = new MatTableDataSource(this.contasReceber$);

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
    private contasReceberService: ContasReceberService,
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
    this.contasReceberService.getContasPaged(page).subscribe({
      next: (data) => {
        this.loading = false;
        this.contasReceber$ = data.content;
        this.totalElements = data.totalElements;
        this.currentPage = page;
        this.dataSource = new MatTableDataSource(this.contasReceber$);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.loading = false;
        this.snackBarService.presentMatSnackbar(error.error.message, 'warning');
      },
    });
  }

  buscarContasPagas() {
    this.router.navigate(['../recebidas'], {relativeTo: this.activatedRoute});
  }

  confirmarExclusaoConta(id: string){
    if (
      confirm(
        "Tem certeza de que deseja excluir a conta ? Ao confirmar a exclusão, os dados da mesma serão deletados."
      )
    ){
      this.contasReceberService.deleteContaById(+id).subscribe({
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
      this.contasReceberService.deleteContaById(+idConta).subscribe({
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

  editarConta(conta: ContasReceber){
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

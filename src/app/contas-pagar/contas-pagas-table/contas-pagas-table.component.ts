import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasPagar } from 'src/app/model/contas-pagar';
import { ContasPagarService } from 'src/app/service/contas-pagar.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-contas-pagas-table',
  templateUrl: './contas-pagas-table.component.html',
  styleUrls: ['./contas-pagas-table.component.scss']
})
export class ContasPagasTableComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  totalElements: number = 0;
  currentPage: number = 0;
  activeTabIndex: number = 0;
  contasPagar$: ContasPagar[] = [];

  @ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'cliente',
    'observacao',
    'centroCusto',
    'valPago',
    'dtPagamento',
    'acoes',
  ];

  dataSource = new MatTableDataSource(this.contasPagar$);

  constructor(
    private contasPagarService: ContasPagarService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buscarContasPagas(0);

    this.activatedRoute.queryParams.subscribe((params) => {
      const tab = params["tab"];
      if (tab) {
        this.activeTabIndex = +tab - 1;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.tabGroup.selectedIndex = this.activeTabIndex;
    this.dataSource.paginator = this.paginator;
  }

  buscarContasPagas(page: number){
    this.loading = true;
    this.contasPagarService.getContasPagasPaged(page).subscribe({
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
        console.error('Contas não encontradas.');
        this.snackBarService.presentMatSnackbar(error.error.message, 'warning');
      },
    })
  }

  changePage(event: any) {
    this.buscarContasPagas(event.pageIndex);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  voltar() {
    this.router.navigate(['../lista'], {relativeTo: this.activatedRoute});
  }


}

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasReceber } from 'src/app/model/contas-receber';
import { ContasReceberService } from 'src/app/service/contas-receber.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-contas-recebidas-table',
  templateUrl: './contas-recebidas-table.component.html',
  styleUrls: ['./contas-recebidas-table.component.scss']
})
export class ContasRecebidasTableComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  totalElements: number = 0;
  currentPage: number = 0;
  activeTabIndex: number = 0;
  contasReceber$: ContasReceber[] = [];

  @ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'cliente',
    'observacao',
    'centroCusto',
    'valRecebido',
    'dtRecebimento',
    'acoes',
  ];

  dataSource = new MatTableDataSource(this.contasReceber$);

  constructor(
    private contasReceberService: ContasReceberService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buscarContasRecebidas(0);

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

  buscarContasRecebidas(page: number){
    this.loading = true;
    this.contasReceberService.getContasRecebidasPaged(page).subscribe({
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

  changePage(event: any) {
    this.buscarContasRecebidas(event.pageIndex);
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

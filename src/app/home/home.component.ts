import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ContaBancaria } from '../model/conta-bancaria';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTabGroup } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../service/snack-bar.service';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  totalElements: number = 0;
  currentPage: number = 0;
  activeTabIndex: number = 0;
  contaBancaria$: Partial<ContaBancaria>[] = [];

  @ViewChild("fileInput") fileInput!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns = [
    'nmBanco',
    'nrAgencia',
    'nrConta',
    'saldo',
    'dtUltAlter'
  ];

  dataSource = new MatTableDataSource(this.contaBancaria$);

  constructor(
    private homeService: HomeService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buscarBancos(0);

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


  buscarBancos(page: number){
    this.loading = true;
    this.homeService.getBancosPaged(page).subscribe({
      next: (data) => {
        this.loading = false;
        this.contaBancaria$ = data.content;
        this.totalElements = data.totalElements;
        this.currentPage = page;
        this.dataSource = new MatTableDataSource(this.contaBancaria$);
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.loading = false;
        this.snackBarService.presentMatSnackbar(error.error.message, 'warning');
      },
    });
  }


  changePage(event: any) {
    this.buscarBancos(event.pageIndex);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}

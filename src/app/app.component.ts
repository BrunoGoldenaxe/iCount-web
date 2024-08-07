import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icount';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){}

  home(){
    this.router.navigate(['../home'], {relativeTo: this.activatedRoute});
  }

  contabil(){}

  contasPagar(){
    this.router.navigate(['../contas-pagar/lista'], {relativeTo: this.activatedRoute});
  }

  contasReceber(){
    this.router.navigate(['../contas-receber/lista'], {relativeTo: this.activatedRoute});
  }
}

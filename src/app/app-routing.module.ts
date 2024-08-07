import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'contas-pagar',
    loadChildren: () => import('./contas-pagar/contas-pagar.module').then(m => m.ContasPagarModule)
  },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'contas-receber',
    loadChildren: () => import('./contas-receber/contas-receber.module').then(m => m.ContasReceberModule)
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

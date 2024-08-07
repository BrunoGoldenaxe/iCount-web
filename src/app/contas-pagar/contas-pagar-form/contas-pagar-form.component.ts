import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasPagarService } from 'src/app/service/contas-pagar.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-contas-pagar-form',
  templateUrl: './contas-pagar-form.component.html',
  styleUrls: ['./contas-pagar-form.component.scss']
})
export class ContasPagarFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contasPagarService: ContasPagarService,

  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      valPagar: [],
      cliente: [''],
      centroCusto: [''],
      dtEmissao: [],
      dtVencimento: [],
      observacao: ['']
    });
  }

  salvar() {
  this.contasPagarService.createContasPagar(this.form.value).subscribe({
      next: (response) => {
        this.snackBarService.presentMatSnackbar(response.message, 'success');
        this.router.navigate(['../lista'], {relativeTo: this.activatedRoute});
      },
      error: (error) => {
        this.snackBarService.presentMatSnackbar(error.error.message, 'danger');
      },
  });
  }

  cancelar() {
    this.router.navigate(['../lista'], {relativeTo: this.activatedRoute});
  }


}

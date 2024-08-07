import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContasReceberService } from 'src/app/service/contas-receber.service';
import { SnackBarService } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-contas-receber-form',
  templateUrl: './contas-receber-form.component.html',
  styleUrls: ['./contas-receber-form.component.scss']
})
export class ContasReceberFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contasReceberService: ContasReceberService,

  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      valReceber: [],
      cliente: [''],
      centroCusto: [''],
      dtEmissao: [],
      dtVencimento: [],
      observacao: ['']
    });
  }

  salvar() {
    this.contasReceberService.createContasReceber(this.form.value).subscribe({
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

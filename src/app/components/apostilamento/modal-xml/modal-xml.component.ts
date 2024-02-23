import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratosService } from 'src/app/services/contratos/lista-contratos.service';
import { ToastrService } from 'ngx-toastr';
import { ContratoService } from 'src/app/services/contratos/contrato.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-xml',
  templateUrl: './modal-xml.component.html',
})
export class ModalXmlComponent implements OnInit {
  exportForm: FormGroup;

  constructor(
    public modal: NgbActiveModal, 
    private fb: FormBuilder,
    public contratoService: ContratoService,
    private toastr: ToastrService,
    private utils: UtilsService,
    public router: Router) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      this.exportForm = this.fb.group({
        mes: [null, Validators.required],
        ano: [currentYear, [Validators.required, Validators.min(0), Validators.max(9999)]],
        contratos: [true],
        ajustes: [true]
      });
    }

  ngOnInit(): void {

  }

  cancelar() {
    this.router.navigate(['/home'])
    this.modal.close();
  }

  exportData() {
    if (this.exportForm.valid) {
      if(this.exportForm.value.contratos) this.exportContratos();
      if(this.exportForm.value.ajustes) this.exportAjustes();
    }else {
      this.toastr.error('Preencha todos os campos obrigatórios!');
      this.utils.markFormGroupTouched(this.exportForm);
    }
  }

  exportContratos() {
    const mes = this.exportForm.get('mes')?.value;
    const ano = this.exportForm.get('ano')?.value;
    this.contratoService.export(ano, mes).subscribe({
      next: (xmlData: any) => {
        const blob = new Blob([xmlData], { type: 'text/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RolContrato.xml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.toastr.success('Download realizado!')
      },
      error: (error) => {
        const err = JSON.parse(error);
        this.toastr.error(err.message);
      }}
    );
  }

  exportAjustes() {
    const mes = this.exportForm.get('mes')?.value;
    const ano = this.exportForm.get('ano')?.value;
    this.contratoService.exportAjuste(ano, mes).subscribe({
      next: (xmlData: any) => {
        const blob = new Blob([xmlData], { type: 'text/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AcompanhamentoContrato.xml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        const err = JSON.parse(error);
        this.toastr.error(err.message);
      }}
    );
  }
}

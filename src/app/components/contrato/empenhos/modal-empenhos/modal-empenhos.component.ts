import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmpenhosService } from 'src/app/services/contratos/empenhos.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';

@Component({
  selector: 'app-modal-empenhos',
  templateUrl: './modal-empenhos.component.html',
  styleUrls: ['./modal-empenhos.component.css']
})
export class ModalEmpenhosComponent {
  public numeroEmpenho: number | null;
  public search: boolean;
  public empenhos: any[];
  public loading: boolean;
  private bouncer: any;
  public form: FormGroup;
  private empenho: any = [];
  constructor(
    private empenhosService: EmpenhosService,
    public modal: NgbActiveModal,
    private toast: ToastrService,
    public utils: UtilsService
    ) {
  }

  selecionarEmpenho(empenho: any) {
    this.empenho = empenho;
    this.search = false;
    this.loading = false;
    this.modal.close(empenho);
  }

  buscarEmpenhos(event: any) {
    clearTimeout(this.bouncer);
    this.bouncer = setTimeout(() => {
      this.getEmpenhos(event.target.value);
    }, 400); 
  }

  getEmpenhos(query: string) {
    if(this.numeroEmpenho) {
      this.loading = true;
      this.empenhosService.pesquisarEmpenhos(this.numeroEmpenho).subscribe({
        next: (data: any) => {
          this.loading = false;
          console.log(data)
          if(data.length > 0) {
            this.empenhos = data;
            this.search = true;
          }else {
            this.empenhos = [];
            this.toast.warning('Empenho não encontrado. Entre em contato com o responsável pelo cadastro.');
          }
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
          this.search = false;
          this.toast.error(error.error.message);
        },
        complete: () => {
          this.loading = false;
          this.search = false;
        }
      })
    }
  }

  adicionarEmpenho() {
    if(this.empenho) this.modal.close(this.empenho);
  }


}

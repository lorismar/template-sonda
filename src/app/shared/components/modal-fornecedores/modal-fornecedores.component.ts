import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { FornecedoresService } from '../../services/fornecedores.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-fornecedores',
  templateUrl: './modal-fornecedores.component.html',
  styleUrls: ['./modal-fornecedores.component.scss']
})
export class ModalFornecedoresComponent {
  public form: FormGroup;
  public faSearch = faSearch;
  public listaFornecedores: any[] = [];
  public page: number = 0;
  public total: number = 0;
  public loading: boolean = false;

  constructor(
    public utils: UtilsService,
    public fb: FormBuilder,
    public fornecedoresService: FornecedoresService,
    public toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      razaoSocial: [null],
      cpfCnpj: [null]
    })
  }

  getList(page?: number) {
    if(page) this.page = page;
    this.loading = true;
    this.fornecedoresService.pesquisarFornecedor(this.page - 1, 10, this.form.value).subscribe({
      next: (response) => {
        if(response.data.length > 0) {
          this.listaFornecedores = response.data;
          this.total = response.totalElements
        }else {
          this.toastr.warning('Nenhum Fornecedor encontrado.');
        }
      },
      error: (error) => {
        this.toastr.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  limparPesquisa() {
    this.form.reset();
  }

  selecionarItem(fornecedor: any) {
    this.activeModal.close(fornecedor);
  }
  
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';
import { FornecedoresService } from 'src/app/shared/services/fornecedores.service';

@Component({
  selector: 'app-modal-razao-social',
  templateUrl: './modal-razao-social.component.html',
  styleUrls: ['./modal-razao-social.component.scss']
})
export class ModalRazaoSocialComponent implements OnInit{
  @Input() data?: any
  @Input() contrato: any
  public selectedFornecedor: any = { razaoSocial: '' };
  public fornecedor: any = {razaoSocialFornecedor: 'carregando...'};
  public fornecedores: any[] = [];
  public razaoSocial: string;
  public search: boolean = false;
  public loading: boolean = false;
  private bouncer: any;
  constructor(
    public activeModal: NgbActiveModal,
    public termoAditivoService: TermoAditivoService,
    public fornecedoresService: FornecedoresService
    ) {}
  ngOnInit(): void {
    if(this.data){
      this.razaoSocial = this.data.acaoTrocaFornecedor.razaoSocialFornecedor;
      this.fornecedor = this.data.fornecedor;
    }
    this.termoAditivoService.getFornecedor(this.contrato.idContrato).subscribe({
      next: (data: any) => {
        this.fornecedor = data;
      }
    });
  }

  pesquisarFornecedor(event: any) {
    clearTimeout(this.bouncer);
    this.bouncer = setTimeout(() => {
      this.getFornecedores(event.target.value);
    }, 400); 
  }

  getFornecedores(query: string) {
    this.loading = true;
    this.fornecedoresService.pesquisarFornecedor(0, 20, {
      razaoSocial: query
    }).subscribe({
      next: (response) => {
        this.loading = false;
        if(response.data.length > 0) {
          this.fornecedores = response.data;
          this.search = true;
        }else {
          this.fornecedores = [];
        }
      }
    })
  }

  selecionarFornecedor(f: any){
    this.selectedFornecedor = f;
    this.razaoSocial = f.razaoSocial;
    this.search = false;
  }

  confirmSelection() {
    this.activeModal.close({...this.selectedFornecedor, fornecedor: this.fornecedor});
  }
}
 
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.component.html',
  styleUrls: ['./modal-select.component.scss']
})
export class ModalSelectComponent implements OnInit{
  @Input() options: any;
  @Input() title: string;
  public search: boolean = false;
  public nome: string;
  public loading: boolean = false;
  public page: number = 0;
  public total: number = 0;
  public filtered: any;
  private bouncerTimer: any;

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
    this.pesquisar();
  }

  callPesquisar() {
    clearTimeout(this.bouncerTimer);
    this.bouncerTimer = setTimeout(() => {
      this.pesquisar();
    }, 400); 
  }

  pesquisar(event?: any) {
    this.loading = true;
    this.search = true;
    if(this.nome) {
      const filter = this.options.filter(
        (item: any) => {
          return item.descricao.includes(this.nome);
        }
      );
      this.loading = false;
      this.search = false;
      if(filter.length > 0) {
        this.filtered = filter;
      }else {
        this.filtered = [];
      }
    }else {
      this.filtered = this.options;
      this.loading = false;
      this.search = false;
    }
  }

  selecionarItem(item: any) {
    this.activeModal.close(item);
  }

  getList(page?: number){

  }

}

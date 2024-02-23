import { Component } from '@angular/core';
import { faEye, faPlus, faSearch, faCheckCircle, faCircleXmark, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ContratosService } from '../../../services/contratos/lista-contratos.service';
import { PesquisaContrato } from 'src/app/model/lista-contratos.model';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { TermoAditivoService } from 'src/app/services/termo-aditivo/termo-aditivo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface ContratoSearchParams {
  page: number;
  size: number;
  sort: string;
  direction: string;
  nomeFornecedor?: string;
  tipoContrato?: string;
  objeto?: string;
  numeroContrato?: number | string;
  numeroProcesso?: number | string;
  gestor?: string;
  unidade?: string;
}
@Component({
  selector: 'app-lista-ta',
  templateUrl: './lista-ta.component.html',
  styleUrls: ['./lista-ta.component.scss'],
})
export class ListaTAComponent {
  public loading: boolean = false;
  p: number = 1;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faSearch = faSearch;
  faCircleXmark = faCircleXmark;
  faCheckCircle = faCheckCircle;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  contratos: PesquisaContrato[] = [];
  nomeFornecedor: string = '';
  objeto: string = '';
  numeroProcesso: string = '';
  nomeGestor: string = '';
  unidade: string = '';
  numeroContrato: string = '';
  contratosArray: any;
  valorTotalContrato: number;
  tipoContrato: string = '';
  gestores: string[] = [];
  unidades: any[] = [];

  page: number = 0;
  size: number = 5;
  totalElements: number;
  totalPages: number;
  direction: string = 'desc'
  sort: string ='dataInicioVigencia'
  sortColumnIndex: any;
  columnNames: any;

  constructor(
    private contratosService: ContratosService,
    private formService: CadastroContratosService,
    private termoAditivoService: TermoAditivoService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.sortColumnIndex = 4;
  }

  ngOnInit(): void {
    // this.getList();
  }

  getList(page?: number) {
    this.loading = true;
    if(page) this.page = page;
    const currentPage = page ? page - 1 : 0;
    console.log(page);
    this.contratosService
      .getContratos(currentPage, this.size, this.sort, this.direction)
      .subscribe((response: any) => {
        this.contratos = response.content
        console.log(this.contratos)
        this.totalElements = response.totalElements
        this.loading = false;
      });
  }

  pesquisarContratos() {
    this.size = 5;
    this.page = 0;
    const params: ContratoSearchParams = {
      page: this.page,
      size: this.size,
      sort: this.sort,
      direction: this.direction,
      nomeFornecedor: undefined,
      tipoContrato: undefined,
      objeto: undefined,
      numeroContrato: undefined,
      numeroProcesso: undefined,
      gestor: undefined,
    };
    if (this.nomeGestor) params.gestor = this.nomeGestor;
    if (this.tipoContrato) params.tipoContrato = this.tipoContrato;
    if (this.nomeFornecedor) params.nomeFornecedor = this.nomeFornecedor;
    if (this.objeto) params.objeto = this.objeto;
    if (this.numeroProcesso) params.numeroProcesso = this.numeroProcesso;
    if (this.unidade) params.unidade = this.unidade;
    if (this.numeroContrato) params.numeroContrato = this.numeroContrato;
    this.loading = true;
    this.contratosService
      .pesquisarContratos(params)
      .subscribe((response: any) => {
        this.contratos = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      });
  }

  filtroLista(col: string) {
    if(col === this.sort && this.direction === 'desc') {
      this.direction = 'asc';
    }else {
      this.sort = col;
      this.direction = 'desc'
    }
    this.getList();
  }

  limparPesquisa() {
    this.nomeFornecedor = '';
    this.objeto = '';
    this.numeroProcesso = '';
    this.nomeGestor = '';
    this.unidade = '';
    this.numeroContrato = '';
    this.tipoContrato = '';
    this.getList();
  }

  limparCacheIdContrato(){
    this.formService.clearForms();
    this.router.navigate(['/home/contrato/lista']);
  }
}

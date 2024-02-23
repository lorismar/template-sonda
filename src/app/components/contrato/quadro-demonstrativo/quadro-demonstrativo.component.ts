import { QuadroDemonstrativoService } from '../../../services/contratos/quadro-demonstrativo.service';
import { QuadroDemonstrativoModel } from '../../../model/quadroDemonstrativo-model';
import { Component, ViewChild } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import {
  faEye,
  faFileUpload,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faDownload,
  faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DadosBasicosService } from 'src/app/services/contratos/dados-basicos.service';
import { DadosBasicosModel } from 'src/app/model/dadosBasicos-model';
import { CadastroContratosService } from 'src/app/services/contratos/cadastro-constratos.service';
import { UtilsService } from 'src/app/services/geral/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemQuadroComponent } from './item-quadro/item-quadro.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
export let quadro_demonstrativo = false;



@Component({
  selector: 'app-quadro-demonstrativo',
  templateUrl: './quadro-demonstrativo.component.html',
  styleUrls: ['./quadro-demonstrativo.component.css'],
})
export class QuadroDemonstrativoComponent {
  @ViewChild('closebutton') closebutton: {
    nativeElement: { click: () => void };
  }; // Ação para fechar a modal
  @ViewChild('modalForm') public modalForm: NgForm;

  quadroValidado = false;
  public quadroDemonstrativo = new QuadroDemonstrativoModel();
  public dadosBasicos = new DadosBasicosModel();
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faPlus = faPlus;
  faFileUpload = faFileUpload;
  faTrashCan = faTrashCan;
  public faFilePdf = faFilePdf;
  public faDownload = faDownload;
  listaQuadroDemonstrativo: any | never = [];
  addQuadroDemonstrativo: any = [];
  idContrato: any;
  nomeArquivo: any;
  public editandoContrato: any;
  editando: boolean;
  numeroContrato: any;
  private idContratoViaRota: ActivatedRouteSnapshot;
  constructor(
    private quadroDemonstrativoService: QuadroDemonstrativoService,
    private dadosBasicosService: DadosBasicosService,
    private toastr: ToastrService,
    private router: Router,
    public formService: CadastroContratosService,
    private activatedRoute: ActivatedRoute,
    private utils: UtilsService,
    private modalService: NgbModal
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.idContrato = this.activatedRoute.snapshot.params['idContrato'];
  }

  ngOnInit(): void {
  }

  public somaItensQuadro(): number {
    return this.formService.listaQuadroDemonstrativo.reduce((currentValue, item) => {
      return currentValue + item.valorTotal
    },0);
  }

  public salvarItensLista() {
    if(this.idContrato && this.idContrato != 'novo'){
      let itensQD = {
        idContrato: this.idContrato,
        itens: this.formService.listaQuadroDemonstrativo,
      };
      if (itensQD.itens.length === 0) {
        this.router.navigate(['/home/contrato/garantias/' + this.idContrato]);
        return 
      }else {
        if(this.formService.listaQuadroDemonstrativo[0].idItemQuadroDemos) {
          this.quadroDemonstrativoService.putItensQD(itensQD, this.idContrato).subscribe({
            next: (data) => {
              this.toastr.success('Lista de itens editados com sucesso!');
              this.formService.progress['quadroDemonstrativo'] = true;
              this.router.navigate(['/home/contrato/garantias/' + this.idContrato]);
            },
            error: (err) => {
              this.toastr.error(err);
            },
          });
        }else {
          this.quadroDemonstrativoService.postItensQD(itensQD).subscribe({
            next: (data) => {
              this.toastr.success('Lista de itens salvo com sucesso!');
              this.formService.progress['quadroDemonstrativo'] = true;
              this.router.navigate(['/home/contrato/garantias/' + this.idContrato]);
            },
            error: (err) => {
              this.toastr.error(err);
            },
          });
        }

      }
    }else {
      const dadosBasicosForm = this.formService.getForm('dadosBasicos');
      this.utils.markFormGroupTouched(dadosBasicosForm);
      this.toastr.error('Preencha e salve os dados básicos antes de continuar.');
      this.router.navigate(['/home/contrato/dados-basicos']);
    }

  }

  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
  
      // Defina os formatos de arquivo aceitos
      const allowedExtensions = ['xlsx', 'xls'];
  
      // Verifique se o arquivo tem uma extensão permitida
      if (!allowedExtensions.includes(fileExtension)) {
        this.toastr.error('Formato de arquivo não suportado!');
        return;
      }
  
      this.nomeArquivo = fileName;
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event: any) => {
        let binaryData = event.target.result;
        let workbook = XLSX.read(binaryData, { type: 'binary' });
        workbook.SheetNames.forEach((sheet) => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          this.formService.listaQuadroDemonstrativo = data.sort();
        });
      };
    } else {
      alert('Nenhum arquivo selecionado!');
    }
  }
  

  downloadFile() {
    const fileName = 'Template Itens Quadro Demonstrativo.zip';
    const filePath = `./assets/files/${fileName}`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.click();
  }

  limparQuadroDemonstrativo() {
    const modal = this.modalService.open(ConfirmationDialogComponent);
    modal.componentInstance.title = 'Limpar Quadro Demonstrativo'
    modal.componentInstance.body = 'Deseja excluir todos os itens do Quadro Demonstrativo?'
    modal.closed.subscribe({
      next: (data) => {
        if(data) {
            this.formService.listaQuadroDemonstrativo = [];
            this.quadroDemonstrativoService
              .deleteListaQuadroDemostrativo(this.idContrato)
              .subscribe({
                next: (data) => {
                  this.toastr.success(
                    'Os items do quadro demonstrativo foi excluido com sucesso'
                  );
                  this.formService.listaQuadroDemonstrativo = [];
                },
                error: (err) => {
                  console.log(err);
                },
              });
        }
      },
      error: (error) => {
        this.toastr.error(error);
      },
      complete: () => {
      }
    })
  }

  public deleteItem(item: any) {
    const modal = this.modalService.open(ConfirmationDialogComponent);
    modal.componentInstance.title = 'Excluir Item'
    modal.componentInstance.body = 'Deseja excluir o item do Quadro Demonstrativo?'
    modal.closed.subscribe({
      next: (result) => {
        if(result) {
          if(item.idItemQuadroDemos) {
            this.quadroDemonstrativoService
            .deleteItemQD(item.idItemQuadroDemos)
            .subscribe({
              next: (data) => {
                this.toastr.success(
                  'O item do quadro demonstrativo foi excluido com sucesso'
                );
                const i = this.formService.listaQuadroDemonstrativo.indexOf(item);
                this.formService.listaQuadroDemonstrativo.splice(i, 1);
              },
              error: (err) => {
                console.log(err);
              },
            });
          }else {
            this.toastr.success(
              'O item do quadro demonstrativo foi excluido com sucesso'
            );
            const i = this.formService.listaQuadroDemonstrativo.indexOf(item);
            this.formService.listaQuadroDemonstrativo.splice(i, 1);
          }
        }
      }
    })
  }

  public async exportPdf() {
    let data = this.formService.listaQuadroDemonstrativo;
    const imageDataUrl = await this.readFileAsDataURL('assets/logo_brasao_cor.png');
    const docDefinition = {
      content: [
        {
          image: imageDataUrl,
          width: 70,
          alignment: 'center',
          margin: [0, -20, 0, 0],
        },
        {
          text: 'PODER JUDICIÁRIO DO ESTADO DE RONDÔNIA',
          alignment: 'center',
          style: 'title',
          fontSize: 11,
          marginBottom: 36
        },
        {
          text: 'Lista Quadro Demonstrativo - Contrato: ' + this.idContrato,
          alignment: 'left',
          style: 'title',
          fontSize: 11,
          marginBottom: 10
        },
        {
          style: 'noBorders',
          table: {
            fontSize: 8,
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', '*', '*'],
            body: [
              [
                'ID',
                'Descrição',
                'Item',
                'Grupo',
                'Unidade',
                'Quant',
                'Valor Unitário',
                'Valor Total',
              ],
              ...data.map((item) => [
                item.idItemQuadroDemos.toString(),
                item.descricao,
                item.item.toString(),
                item.grupo,
                item.unidade,
                item.quantidade.toString(),
                'R$ ' + item.valorUnitario.toFixed(2),
                'R$ ' + item.valorTotal.toFixed(2),
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      footer: {
        columns: [
          {
            text: 'Porto Velho - RO, 2023',
            style: 'indent',
            alignment: 'center',
          },
        ],
      },
      styles: {
        modalTitle: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        title: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0],
        },
        bold: {
          bold: true,
          margin: [0, 5, 0, 0],
        },
        indent: {
          margin: [0, 10, 0, 0],
        },
      },
    };
  
    pdfMake.createPdf(docDefinition).download('relatorio_itens.pdf');
  }

  public openItem(itemQD?: any) {
    if(this.idContrato && this.idContrato != 'novo'){
      const modal = this.modalService.open(ItemQuadroComponent);
      if(itemQD) modal.componentInstance.item = itemQD;
      modal.closed.subscribe((item: any) => {
        if(item) {
          if(itemQD) {
            const i = this.formService.listaQuadroDemonstrativo.indexOf(itemQD);
            this.formService.listaQuadroDemonstrativo[i] = item;
          }else {
            this.formService.listaQuadroDemonstrativo.push(item);
          }
          this.toastr.success('item adicionado com sucesso');
        }
      })
    }else {
      const dadosBasicosForm = this.formService.getForm('dadosBasicos');
      this.utils.markFormGroupTouched(dadosBasicosForm);
      this.toastr.error('Preencha e salve os dados básicos antes de continuar.');
      this.router.navigate(['/home/contrato/dados-basicos']);
    }
  }

  async readFileAsDataURL(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      fetch(filePath)
        .then((response) => response.blob())
        .then((blob) => {
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  }
}

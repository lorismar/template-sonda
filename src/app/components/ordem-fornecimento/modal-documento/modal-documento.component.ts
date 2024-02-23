import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-documento',
  templateUrl: './modal-documento.component.html',
  styleUrls: ['./modal-documento.component.scss']
})
export class ModalDocumentoComponent {
  @Input() data: any;
  @Input() originalOF: any;
  @Input() quadroDemonstrativo: any;
  constructor(
    public modal: NgbActiveModal,
    public toastr: ToastrService) {}

  getPropriedade(id: number, prop: string): any {
    const item = this.quadroDemonstrativo.find((i: any) => i.idItemQuadroDemons === id);
    if (item && item.hasOwnProperty(prop)) {
        return item[prop];
    }
    return null;
  }

  copyToClipboard(): void {
    const content = document.getElementById('copy');
    if (content) {
      // navigator.clipboard.writeText(content.innerText)
      const blob = new Blob([content.innerHTML], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];
      navigator.clipboard.write(data)
        .then(() => {
          this.toastr.success('Conteúdo copiado com sucesso!');
        })
        .catch(err => {
          this.toastr.error('Falha ao copiar: ', err);
        });
    }
  }


}


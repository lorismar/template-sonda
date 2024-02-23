import { Component } from '@angular/core';
import { faBell, faRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent {
  public loading: boolean = false;
  public listaNotificacoes: any[] = [];
  public faBell = faBell;
  public faRotate = faRotate;

  getNotificacoes() {

  }

  limparTotas() {

  }

  navegar(pedido: any) {

  }

  excluirNotificacao(event: Event, id: String) {

  }
}

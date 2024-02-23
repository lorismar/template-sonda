import { AuthService } from '../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  faArrowRightToBracket,
  faBars,
  faCircleHalfStroke,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faReply,
  faRotate,
  faUniversalAccess,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
constructor(private authService: AuthService){}
  labelEvent = {
    application: 'Gestão de Contratos',
    titleApplication: 'Sistema de Gestão de Certificados Digitais',
    sgc: 'SGC',
    title: '',
    cardInfo: '',
    calendar: '',
    list: '',
  };
  faBars = faBars;
  faUniversalAccess = faUniversalAccess;
  faUsers = faUser;
  faArrowRightToBracket = faArrowRightToBracket;
  faReply = faReply;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  faMagnifyingGlassMinus = faMagnifyingGlassMinus;
  faRotate = faRotate;
  faCircleHalfStroke = faCircleHalfStroke;
  font_size = 16;
  setFontSize(idd: string) {
    //calc font size
    if (idd === "a+") {
      this.font_size += 1;
    } else if (idd === "a-") {
      this.font_size -= 1;
    } else {
      this.font_size = 16;
    }

    //set font size
    let htmlRoot: HTMLElement = <HTMLElement>(
      document.getElementsByTagName("html")[0]
    );
    if (htmlRoot != null) {
      htmlRoot.style.fontSize = `${this.font_size}px`;
    }
  }
  
  toggleMenu() {
    $("body").toggleClass("collapsedMenu");
  }
  contraste() {
    $("body").toggleClass("hight-contrast");
  }

  deslogar() {
    this.authService.deslogar();
  }

  ngOnInit(): void {
 
  }


}

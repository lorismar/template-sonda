import { AuthService } from 'src/app/services/auth/auth.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  faKey,
  faUser,
  faEye,
  faUniversalAccess,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faRotate,
  faCircleHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LogoffComponent } from 'src/app/components/shared/logoff/logoff.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faKey = faKey;
  faUser = faUser;
  faEye = faEye;

  public usuario: UsuarioModel = new UsuarioModel();
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit(usuario: any) {
    this.authService.loginSSO(usuario).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data) {
          this.router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        this.toastr.error(err);
      },
    });
  }
  font_size = 16;
  faUniversalAccess = faUniversalAccess;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  faMagnifyingGlassMinus = faMagnifyingGlassMinus;
  faRotate = faRotate;
  faCircleHalfStroke = faCircleHalfStroke;

  setFontSize(idd: string) {
    //calc font size
    if (idd === 'a+') {
      this.font_size += 1;
    } else if (idd === 'a-') {
      this.font_size -= 1;
    } else {
      this.font_size = 16;
    }

    //set font size
    let htmlRoot: HTMLElement = <HTMLElement>(
      document.getElementsByTagName('html')[0]
    );
    if (htmlRoot != null) {
      htmlRoot.style.fontSize = `${this.font_size}px`;
    }
  }
  contraste() {
    $('body').toggleClass('hight-contrast');
  }

}

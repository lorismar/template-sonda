import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  editandoContrato: any = undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}

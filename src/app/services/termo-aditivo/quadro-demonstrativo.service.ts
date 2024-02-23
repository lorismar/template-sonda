import { environment } from 'src/environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuadroDemonstrativoModel } from 'src/app/model/quadroDemonstrativo-model';
import { AppConfigService } from 'src/app/providers/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TQuadroDemonstrativoService {
  url: string;
  constructor(private http: HttpClient, configService: AppConfigService) { 
    this.url = configService.config.baseUrl;
  }

  getAllListaItens(idAjusteContrato: any): Observable<any> {
    return this.http.get(`${this.url}/quadro-demonstrativo/ajuste/${idAjusteContrato}`)
  }

  postItensQD(itensQD: any): Observable<any>{
    return this.http.post(`${this.url}/quadro-demonstrativo`, itensQD)
  }

  putItensQD(itensQD: any, idAjusteContrato: any): Observable<any> {
    return this.http.put(`${this.url}/quadro-demonstrativo`, itensQD);
  }

  getItemQDById(idItemQuadroDemos: any): Observable<any> {
    return this.http.get(`${this.url}/quadro-demonstrativo/${idItemQuadroDemos}`)
  }

  deleteListaQuadroDemostrativo(idAjusteContrato: any): Observable<any> {
    return this.http.delete(`${this.url}/quadro-demonstrativo/ajuste/${idAjusteContrato}`)
  }
  deleteItemQD(idItemQuadroDemostrativo: any): Observable<any> {
    return this.http.delete(`${this.url}/quadro-demonstrativo/${idItemQuadroDemostrativo}`)
  }

//   getQuadroDemonstrativo(idContrato?: string) {
//     if(!idContrato) idContrato = this.dadosBasicosForm.value.idContrato;
//     this.quadroDemonstrativoService.getAllListaItens(idContrato).subscribe({
//       next: (data: any) => {
//       this.listaQuadroDemonstrativoContrato = data.sort((a: any, b: any) => a.item - b.item);
//       this.setQuadro();
//       if(this.dadosBasicosForm.value.idAjusteContrato) this.getQuadroDemonstrativoTA();
//       },
//       error: (error) => {
//         console.log(error);
//       },
      
//     });
//   }

//   getQuadroDemonstrativoTA(idAjusteContrato?: string) {
//     if(!idAjusteContrato) idAjusteContrato = this.dadosBasicosForm.value.idAjusteContrato;
//     this.tQuadroDemonstrativoService.getAllListaItens(idAjusteContrato).subscribe({
//       next: (data) => {
//         if(data.length > 0) {
//           this.listaQuadroDemonstrativoTA = data.sort((a: any, b: any) => a.item - b.item);
//         }
//          this.setQuadro();
//       }
//     });
//   }

//   setQuadro() {
//   const merge = this.listaQuadroDemonstrativoContrato.map((item) => {
//       const finded =  this.listaQuadroDemonstrativoTA.find(element => element.idItemQuadroDemosOriginal === item.idItemQuadroDemos);
//       if(finded) return {...this.utils.deepClone(finded), valorTotal: finded.valorTotal + item.valorTotal, quantidade: finded.quantidade + item.quantidade, valorUnitario: finded.valorUnitario + item.valorUnitario}
//       else return this.utils.deepClone(item)
//     });
//     const created = this.listaQuadroDemonstrativoTA.filter(item => {
//       if(item.idItemQuadroDemos && !item.idItemQuadroDemosOriginal) return this.utils.deepClone(item);
//     })
//     const changed = this.listaQuadroDemonstrativo.filter(item => {
//       if(!item.idItemQuadroDemos && item.idItemQuadroDemosOriginal) return this.utils.deepClone(item);
//     }) 
//     if(changed) {
//       changed.map((item: any) => {
//         let find = merge.find((el: any) => el.idItemQuadroDemos === item.idItemQuadroDemosOriginal);
//         if(find) {
//           console.log(find)
//           merge[merge.indexOf(find)] = item;
//         }
//       })
//     }
//     this.listaQuadroDemonstrativo = created ? [...merge.concat(created)] : [...merge]
// }
  

}

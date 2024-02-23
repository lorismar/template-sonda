import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Buffer } from 'buffer';
import { Map } from 'src/app/types/termo-aditivo';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  stringToBase64(input: string): string {
    let result = '';
    try {
      result = Buffer.from(input).toString('base64');
    } catch (e) {
      console.error('Failed to convert string to base64', e);
    }
    return result;
  }

  arred(numero: number, casasDecimais: number) {
    var multiplicador = Math.pow(10, casasDecimais);
    return Math.ceil(numero * multiplicador) / multiplicador;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        this.markFormArrayTouched(control);
      }
    });
  }
  
  markFormArrayTouched(formArray: FormArray) {
    formArray.controls.forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        this.markFormArrayTouched(control);
      }
    });
  }
  
  deepClone(obj: any){
    return JSON.parse(JSON.stringify(obj));
  } 

      markFormGroupDirty(form: FormGroup) {
        Object.values(form.controls).forEach(control => {
          if(!control.valid){
            control.markAsDirty();
          }else {
            control.markAsPristine();
          }
    
          if ((control as any).controls) {
            this.markFormGroupDirty(control as FormGroup);
          }
        });
      }

      formatarCPFCNPJ(cpfcnpj: any): string {
        let cpfcnpjFormatado = cpfcnpj;
        if (cpfcnpj.length === 11) {
          // CPF: formata como 999.999.999-99
          cpfcnpjFormatado = cpfcnpj.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
          );
        } else if (cpfcnpj.length === 14) {
          // CNPJ: formata como 99.999.999/9999-99
          cpfcnpjFormatado = cpfcnpj.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
          );
        }
        return cpfcnpjFormatado;
      }
      
      formatarTelefone(telefone: any): string {
        const telefoneFormatado = telefone.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          '($1) $2-$3'
        );
        return telefoneFormatado;
      }


      extractId(url: string): string {
        const padrao = /\/(\d+)$/;
        const resultado = url.match(padrao);
        if (resultado) {
          return resultado[1];
        } else {
          return '';
        }
      }

      isCpfCnpj(control: AbstractControl): ValidationErrors | null {
        if(control.value) {
          const cpfCnpj = control.value;
      
          if (cpfCnpj.length <= 11) {
            const cpf = cpfCnpj.replace(/\.|-/g, '');
        
            if (cpf.length !== 11 || cpf.split('').every((digit: any) => digit === cpf[0])) {
              return { cpfCnpjInvalid: true };
            }
        
            let soma = 0;
            for (let i = 0; i < 9; i++) {
              soma += parseInt(cpf[i]) * (10 - i);
            }
            let digito = (soma * 10) % 11;
            if (digito === 10 || digito === 11) {
              digito = 0;
            }
            if (digito !== parseInt(cpf[9])) {
              return { cpfCnpjInvalid: true };
            }
        
            soma = 0;
            for (let i = 0; i < 10; i++) {
              soma += parseInt(cpf[i]) * (11 - i);
            }
            digito = (soma * 10) % 11;
            if (digito === 10 || digito === 11) {
              digito = 0;
            }
            if (digito !== parseInt(cpf[10])) {
              return { cpfCnpjInvalid: true };
            }
        
            return null;
          } else {
            const cnpj = cpfCnpj.replace(/[^\d]+/g, '');
        
            if (cnpj.length !== 14) {
              return { cpfCnpjInvalid: true };
            }
        
            if (/^(\d)\1+$/.test(cnpj)) {
              return { cpfCnpjInvalid: true };
            }
        
            let tamanho = cnpj.length - 2;
            let numeros = cnpj.substring(0, tamanho);
            const digitos = cnpj.substring(tamanho);
            let soma = 0;
            let pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
              soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
              if (pos < 2) {
                pos = 9;
              }
            }
            let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(0))) {
              return { cpfCnpjInvalid: true };
            }
        
            tamanho += 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (let i = tamanho; i >= 1; i--) {
              soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
              if (pos < 2) {
                pos = 9;
              }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (resultado !== parseInt(digitos.charAt(1))) {
              return { cpfCnpjInvalid: true };
            }
        
            return null;
          }
        }else {
          return null;
        }
      }

      lastDigits(valor?: number | string): string {
        if(valor){
          let strValor = valor.toString();
          let ultimosDigitos = strValor.slice(-2);
          return ultimosDigitos;
        }else {
          return '';
        }

      }

      compactText(text: string | null): string {
        if(text) {
          return text.slice(0, 50) + (text.length > 49 ? '...' : '')
        }else {
          return ''
        }
      }

       toJSON(data: Map): object {
        const obj: any = {};
        Object.keys(data).forEach(key => {
            obj[key] = data[key];
        });
        return obj;
    }
      
    logInvalidControls(form: FormGroup) {
      Object.keys(form.controls).forEach(key => {
        const control = form.get(key);
        if (control && !control.valid) {
          console.log(`Control with key '${key}' is invalid.`);
        }
      });
    }

    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
  
      return `${year}-${formattedMonth}-${formattedDay}`;
    }
    
}

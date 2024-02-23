import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'megabytes' })
export class MegabytesPipe implements PipeTransform {
  transform(value: number): string {
    const mb = value / 1048576; // 1 MB = 1048576 bytes
    return mb.toFixed(2); 
  }
}
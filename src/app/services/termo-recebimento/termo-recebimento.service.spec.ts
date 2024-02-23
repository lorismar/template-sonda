import { TestBed } from '@angular/core/testing';

import { TermoRecebimentoService } from './termo-recebimento.service';

describe('TermoRecebimentoService', () => {
  let service: TermoRecebimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermoRecebimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

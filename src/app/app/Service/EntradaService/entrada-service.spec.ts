import { TestBed } from '@angular/core/testing';
import { entradaService } from './entrada-service';

describe('EntradaService', () => {
  let service: entradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(entradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

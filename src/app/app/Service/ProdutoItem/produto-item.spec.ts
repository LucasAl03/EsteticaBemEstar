import { TestBed } from '@angular/core/testing';
import { ProdutoItem } from './produto-item';

describe('ProdutoItem', () => {
  let service: ProdutoItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

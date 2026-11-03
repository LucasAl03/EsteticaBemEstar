import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroProdutos } from './cadastro-produtos';

describe('CadastroProdutos', () => {
  let component: CadastroProdutos;
  let fixture: ComponentFixture<CadastroProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

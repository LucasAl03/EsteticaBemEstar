import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnderecoCadastro } from './endereco-cadastro';

describe('EnderecoCadastro', () => {
  let component: EnderecoCadastro;
  let fixture: ComponentFixture<EnderecoCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecoCadastro],
    }).compileComponents();

    fixture = TestBed.createComponent(EnderecoCadastro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

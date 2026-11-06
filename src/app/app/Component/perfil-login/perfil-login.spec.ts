import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilLogin } from './perfil-login';

describe('PerfilLogin', () => {
  let component: PerfilLogin;
  let fixture: ComponentFixture<PerfilLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

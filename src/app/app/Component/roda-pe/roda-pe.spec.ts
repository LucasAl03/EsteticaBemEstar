import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RodaPe } from './roda-pe';

describe('RodaPe', () => {
  let component: RodaPe;
  let fixture: ComponentFixture<RodaPe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodaPe],
    }).compileComponents();

    fixture = TestBed.createComponent(RodaPe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

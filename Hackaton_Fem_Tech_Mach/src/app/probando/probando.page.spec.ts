import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProbandoPage } from './probando.page';

describe('ProbandoPage', () => {
  let component: ProbandoPage;
  let fixture: ComponentFixture<ProbandoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

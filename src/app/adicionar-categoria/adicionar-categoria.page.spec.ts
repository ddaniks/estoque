import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarCategoriaPage } from './adicionar-categoria.page';

describe('AdicionarCategoriaPage', () => {
  let component: AdicionarCategoriaPage;
  let fixture: ComponentFixture<AdicionarCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

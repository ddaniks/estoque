import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarProdutoPage } from './adicionar-produto.page';

describe('AdicionarProdutoPage', () => {
  let component: AdicionarProdutoPage;
  let fixture: ComponentFixture<AdicionarProdutoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

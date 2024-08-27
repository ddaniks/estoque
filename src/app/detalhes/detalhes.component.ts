import { Component, Input, NgModule, OnInit } from '@angular/core';
import { produto } from '../produtos/produtos.module';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
})
export class DetalhesComponent  implements OnInit {
  @Input()produto!:produto;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
@NgModule({
  declarations: [DetalhesComponent],
  imports: [
    CommonModule,
    IonicModule,
    // outros módulos necessários
  ],
  exports: [DetalhesComponent],
})
export class DetalhesModule { }
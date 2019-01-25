import { Component, OnInit, Input } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() value:any 

  constructor(navParams: NavParams, private modalController: ModalController) { }
  async closeCart(){
    await this.modalController.dismiss()
  }

  ngOnInit() {
  }

}

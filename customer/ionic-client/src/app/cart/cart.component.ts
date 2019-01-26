import {
  Component,
  OnInit,
  Input,
  ModuleWithComponentFactories
} from '@angular/core'
import { NavParams, ModalController } from '@ionic/angular'
import { MatchMedia } from '@angular/flex-layout'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() value: any
  public items: Array<{
    productName: string
    productSpecName: string
    count: number
    totalMoeny: number
  }> = []

  constructor(navParams: NavParams, private modalController: ModalController) {
    for (let i = 0; i < 11; i++) {
      this.items.push({
        productName: 'name' + i,
        productSpecName: '规格' + i,
        count: Math.round(20),
        totalMoeny: Math.round(11.3)
      })
    }
  }
  async closeCart() {
    await this.modalController.dismiss()
  }

  ngOnInit() {}
}

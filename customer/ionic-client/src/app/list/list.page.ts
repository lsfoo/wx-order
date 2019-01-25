import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CartComponent  } from "../cart/cart.component";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ]
  public items: Array<{
    title: string
    note: string
    icon: string
    photo: string
    price: number
    hasSpec: boolean
  }> = []
  slideOpts

  constructor(public modalController: ModalController) {
    for (let i = 1; i < 11; i++) {
      var isHasSpec = false
      if (i % 2 == 0) {
        isHasSpec = true
      }

      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        photo: 'http://placehold.it/120x120/',
        price: 15.01,
        hasSpec: isHasSpec
      })
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CartComponent,
      componentProps: { value: {kdk:123} }
    })
    return await modal.present()
  }
  cartDetails() {}

  ngOnInit() {
    this.slideOpts = {
      loop: false,
      autoplay: false,
      initialSlide: 0,
      pager: false,
      slidesPerView: 7,
      paginationHide: true,
      paginationClickable: true,
      scrollbar: false
    }
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}

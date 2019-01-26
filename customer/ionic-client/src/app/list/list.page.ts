import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CartComponent } from '../cart/cart.component'
import { SpecsComponent } from '../specs/specs.component'

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
    hasStock: boolean
    stock: number
    salesMonth: number
    specs: any
  }> = []
  public specs: Array<{
    title: string
    stock: number
    price: number
  }> = []
  slideOpts

  constructor(public modalController: ModalController) {
    for (let i = 0; i < 5; i++) {
      this.specs.push({
        title: '规格' + i,
        stock: 99,
        price: 11.2
      })
    }
    for (let i = 1; i < 11; i++) {
      var isHasSpec = false
      var isHasStock = true
      if (i % 2 == 0) {
        isHasSpec = true
        isHasStock = false
      }

      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        photo: 'http://placehold.it/120x120/',
        price: 15.01,
        hasSpec: isHasSpec,
        hasStock: isHasStock,
        stock: Math.round(10),
        salesMonth: Math.round(20),
        specs: this.specs
      })
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CartComponent,
      componentProps: { value: { kdk: 123 } }
    })
    return await modal.present()
  }
  async presentModalSpecs(specs) {
    const modal = await this.modalController.create({
      component: SpecsComponent,
      componentProps: { data: specs }
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

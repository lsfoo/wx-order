import { Component, OnInit, Input } from '@angular/core'

import { NavParams, ModalController } from '@ionic/angular'
@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.scss']
})
export class SpecsComponent implements OnInit {
  @Input() data: any
  constructor(public modalController: ModalController) {}
  async closeModal() {
    await this.modalController.dismiss()
  }

  ngOnInit() {}
}

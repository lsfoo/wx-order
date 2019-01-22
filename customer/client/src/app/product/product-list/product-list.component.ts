import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('topbar') topbarel: ElementRef
  topbarHeight: number
  @ViewChild('main') mainel: ElementRef

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.topbarHeight = this.topbarel.nativeElement.clientHeight
    console.log(this.topbarHeight)
    this.renderer.setStyle(
      this.mainel.nativeElement,
      'padding-top',
      this.topbarHeight + 'px'
    )
  }
}

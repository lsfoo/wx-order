import { Component, OnInit } from '@angular/core'
import { ICategory } from '../shared/model/category.model'
import { IProduct } from '../shared/model/product.model'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categories: ICategory[]
  products: IProduct[]
  constructor(
    private categoryService: CategoryService,
    private productResourceService: ProductResourceService
  ) {
    this.categoryResourceService.getAllCategoriesUsingGET().subscribe(res => {
      this.categories = res
    })
    this.productResourceService.getAllProductsUsingGET().subscribe(res => {
      console.log(res)
      this.products = res
    })
  }

  ngOnInit() {}
}

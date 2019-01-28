import { Component, OnInit } from '@angular/core'
import {
  CategoryResourceService,
  ProductResourceService,
  Product,
  Category
} from 'shared'
import { HttpHeaders } from '@angular/common/http'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categories: Array<Category> = []
  products: Array<Product> = []
  constructor(
    private categoryResourceService: CategoryResourceService,
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

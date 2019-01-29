import { CartComponent } from './../cart/cart.component'
import { Component, OnInit, ViewChild } from '@angular/core'
import {
  CategoryResourceService,
  ProductResourceService,
  Product,
  Category,
  JWTToken,
  LoginVM,
  UserJwtControllerService
} from 'shared'
import { HttpHeaders } from '@angular/common/http'
import { JwtService } from '../core/jwt.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categories: Array<Category> = []
  products: Array<Product> = []
  jwtToken: JWTToken
  loginVM: LoginVM
  showCart: Boolean
  constructor(
    private categoryResourceService: CategoryResourceService,
    private productResourceService: ProductResourceService,
    private jwtService: JwtService
  ) {
    this.showCart = false
    this.loginVM = {
      username: 'admin',
      password: 'admin',
      rememberMe: true
    }
    jwtService.login(this.loginVM).subscribe(res => {
      const jwt = jwtService.getToken()
      console.log('jwt' + jwt)
      this.categoryResourceService.getAllCategoriesUsingGET().subscribe(res => {
        this.categories = res
      })
      this.productResourceService.getAllProductsUsingGET().subscribe(res => {
        console.log(res)
        this.products = res
      })
    })
  }

  ngOnInit() {}
  openCartModal() {
    this.showCart = true
  }
  closeCartModal() {
    this.showCart = false
  }
}

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailsComponent } from './product-details/product-details.component'

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
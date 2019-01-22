import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CartDetailsComponent } from './cart-details/cart-details.component'

const routes: Routes = [
  {
    path: 'details',
    component: CartDetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}

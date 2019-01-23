import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProductRoutingModule } from './product-routing.module'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailsComponent } from './product-details/product-details.component'

import { FlexLayoutModule } from '@angular/flex-layout'

import 'hammerjs'
import {
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatListModule,
  MatBottomSheetModule,
  MatTabsModule,
  MatExpansionModule
} from '@angular/material'
@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatListModule,
    MatBottomSheetModule,
    MatTabsModule,

  MatExpansionModule
  ]
})
export class ProductModule {}

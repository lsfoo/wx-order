import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { CartComponent } from './cart/cart.component'
import { SpecsComponent } from './specs/specs.component'

@NgModule({
  declarations: [AppComponent, CartComponent, SpecsComponent],
  entryComponents: [CartComponent, SpecsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

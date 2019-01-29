import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'

import { NgxWebstorageModule } from 'ngx-webstorage'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import 'hammerjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ListComponent } from './list/list.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApiModule, Configuration, ConfigurationParameters } from 'shared'
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor'
import { CartComponent } from './cart/cart.component'
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor'
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params)
}

@NgModule({
  declarations: [AppComponent, ListComponent, CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

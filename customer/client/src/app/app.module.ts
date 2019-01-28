import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import 'hammerjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ListComponent } from './list/list.component'
import { HttpClientModule } from '@angular/common/http'
import { ApiModule, Configuration, ConfigurationParameters } from 'shared'
export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    accessToken:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU0ODc1MjgyOH0.36-HTwA5wPENscbS6HAlC_uMYtNQt4al75nDHmwLAr4fXRlu6twtGQHKeVw69IP31mIE33kj9ZUhIwCbDN7evg'
  }
  return new Configuration(params)
}

@NgModule({
  declarations: [AppComponent, ListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

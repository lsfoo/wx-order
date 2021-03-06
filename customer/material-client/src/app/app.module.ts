import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Input } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MatButtonModule } from '@angular/material'
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {GraphicComponent} from "./graphic/graphic.component";
import {MenuComponent} from "./menu/menu.component";
import { SortCoinsComponent } from './sort-coins/sort-coins.component';
import { CreateCSVComponent } from './servises/create-csv/create-csv.component';
// import { HttpServiceComponent } from './servises/http-service/http-service.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
    MenuComponent,
    SortCoinsComponent,
    CreateCSVComponent,
    // HttpServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

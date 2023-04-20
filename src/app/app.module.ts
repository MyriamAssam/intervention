import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CategorieData } from './probleme/categorie-data';
import { CategorieService } from './probleme/categorie.service';

@NgModule({
  declarations: [
    AppComponent,
    BienvenueComponent,   
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule .forRoot(CategorieData, { delay: 1000 })
],
  providers: [CategorieService],
  bootstrap: [AppComponent]
})
export class AppModule { }


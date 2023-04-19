import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypeService } from './probleme/type.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProblemeData } from './probleme/type-data';

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
    HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 })
],
  providers: [TypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }


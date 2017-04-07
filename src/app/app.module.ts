import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from "@angular/router";

import { HighlightDirective } from './core/highlight.directive';

import { HeroesModule } from './heroes/heroes.module';
import { AppRoutingModule } from './app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/in-memory-data.service';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './shared/compose-message/compose-message.component';
import { DialogService } from './shared/dialog.service';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HighlightDirective,
    PageNotFoundComponent,
    ComposeMessageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HeroesModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [DialogService]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes:' , JSON.stringify(router.config, undefined, 2));
  }
 }

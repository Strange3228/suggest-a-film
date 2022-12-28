import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarGuestComponent } from './components/navbar-guest/navbar-guest.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarGuestComponent,
    NavbarAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

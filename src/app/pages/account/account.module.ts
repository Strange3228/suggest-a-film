import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountRoutingModule } from "./account-routing.module";
import { AddToListComponent } from './components/add-to-list/add-to-list.component';
import {SharedModule} from "../../shared/shared.module";
import { MediaListComponent } from './components/media-list/media-list.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AddToListComponent,
    MediaListComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class AccountModule { }

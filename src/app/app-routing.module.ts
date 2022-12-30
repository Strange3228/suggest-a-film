import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'content',
    loadChildren: () => import('./pages/content/content.module')
      .then(m => m.ContentModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module')
      .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

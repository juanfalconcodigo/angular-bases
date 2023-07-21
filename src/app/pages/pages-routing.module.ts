import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { adminGuard } from '../core/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('src/app/pages/login/login.module').then((m) => m.LoginModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('src/app/pages/admin/admin.module').then((m) => m.AdminModule),
        canActivate:[adminGuard]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

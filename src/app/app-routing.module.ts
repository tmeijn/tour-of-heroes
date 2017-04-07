import { AuthGuardService } from './core/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from "app/shared/page-not-found/page-not-found.component";
import { ComposeMessageComponent } from './shared/compose-message/compose-message.component';

import { CanDeactivateGuard } from './core/can-deactivate-guard.service';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }) ],
    exports: [ RouterModule ],
    providers: [CanDeactivateGuard, AuthGuardService]
})

export class AppRoutingModule {}
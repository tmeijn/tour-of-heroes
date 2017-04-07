import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisesComponent } from './crises.component';

import { CanDeactivateGuard } from '../core/can-deactivate-guard.service';

import { CrisisDetailResolver } from './crisis-detail/crisis-detail-resolver.service';

const crisisCenterRoutes: Routes = [
  {
    path: '', 
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisesComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
 },
];

@NgModule({
  imports: [
      RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
      RouterModule
  ],
  providers: [
    CrisisDetailResolver
  ]
})

export class CrisisCenterRoutingModule {}
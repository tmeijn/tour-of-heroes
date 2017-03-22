import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisesComponent } from './crises.component';

const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center', 
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisesComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent
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
  ]
})

export class CrisisCenterRoutingModule {}
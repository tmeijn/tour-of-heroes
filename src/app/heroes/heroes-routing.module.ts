import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';

const heroesRoutes: Routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'hero/:id', component: HeroDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(heroesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class HeroRoutingModule {}
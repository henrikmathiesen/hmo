import { Routes } from '@angular/router';

import { ResurserComponent, OmComponent, StartComponent, TerapinComponent, TestComponent } from './routes';

export const routes: Routes = [
    {
        path: 'start',
        component: StartComponent
    },
    {
        path: 'om',
        component: OmComponent
    },
    {
        path: 'test',
        component: TestComponent
    },
    {
        path: 'terapin',
        component: TerapinComponent
    },
    {
        path: 'resurser',
        component: ResurserComponent
    },
    {
        path: '', 
        redirectTo: 'start', 
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'start'
    }
];

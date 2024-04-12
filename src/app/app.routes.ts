import { Routes } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
import { MemesComponent } from './memes/memes.component';

export const routes: Routes = [
  {
    path: '',
    component: MemesComponent,
  },
  {
    path: 'blank',
    component: BlankComponent,
  },
];

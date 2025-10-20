import { Routes } from '@angular/router';
import { VideoPageComponent } from './video-page/video-page.component';
import { HomeComponent } from './home/home.component';
import { CarPageComponent } from './car-page/car-page.component';
import { TennisPageComponent } from './tennis-page/tennis-page.component';
import { ResumePageComponent } from './resume-page/resume-page.component';

export const routes: Routes = [
  { 
    path: '', 
    component: VideoPageComponent 
  },
  { 
    path: 'index', 
    component: HomeComponent 
  },
  { 
    path: 'car', 
    component: CarPageComponent 
  },
  { 
    path: 'tennis', 
    component: TennisPageComponent 
  },
  { 
    path: 'resume', 
    component: ResumePageComponent 
  }
];

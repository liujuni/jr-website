import { Routes } from '@angular/router';
import { VideoPageComponent } from './video-page/video-page.component';
import { HomeComponent } from './home/home.component';
import { CarPageComponent } from './car-page/car-page.component';
import { TennisPageComponent } from './tennis-page/tennis-page.component';
import { ResumePageComponent } from './resume-page/resume-page.component';
import { LinkedInRedirectComponent } from './linkedin-redirect/linkedin-redirect.component';
import { MjClubRedirectComponent } from './mjclub-redirect/mjclub-redirect.component';

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
  },
  { 
    path: 'linkedin', 
    component: LinkedInRedirectComponent 
  },
  { 
    path: 'mjclub', 
    component: MjClubRedirectComponent 
  }
];

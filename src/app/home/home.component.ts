import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Profile Picture Section -->
      <div class="profile-section show">
        <div class="profile-container" (click)="nextProfilePicture()">
          <div class="profile-frame">
            <img 
              [src]="currentProfilePicture" 
              [alt]="'Profile Picture ' + (currentProfileIndex + 1)"
              class="profile-image">
          </div>
        </div>
      </div>
      
      <!-- Navigation Icons -->
      <div class="navigation-icons show">
        <a href="https://www.linkedin.com/in/junior-liu-548241102/" target="_blank" class="nav-icon" title="LinkedIn">
          <img [src]="linkedinIconUrl" alt="LinkedIn" class="icon">
        </a>
        
        <a routerLink="/resume" class="nav-icon" title="CV">
          <img [src]="cvIconUrl" alt="CV" class="icon">
        </a>
        
        <a href="http://www.seattlemj.com" target="_blank" class="nav-icon" title="MJClub">
          <img [src]="mjClubIconUrl" alt="MJClub" class="icon">
        </a>
        
        <a routerLink="/car" class="nav-icon" title="Car Page">
          <img [src]="porscheIconUrl" alt="Car Page" class="icon">
        </a>
        
        <a routerLink="/tennis" class="nav-icon" title="Tennis Page">
          <img [src]="tennisIconUrl" alt="Tennis Page" class="icon">
        </a>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: black;
      position: relative;
      overflow-x: hidden;
      padding: 2rem 1rem;
    }
    
    .profile-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .profile-section.show {
      opacity: 1;
      transform: scale(1);
    }
    
    .profile-container {
      cursor: pointer;
      transition: transform 0.3s ease;
      margin-bottom: 3rem;
    }
    
    .profile-container:hover {
      transform: scale(1.05);
    }
    
    .profile-frame {
      position: relative;
      display: inline-block;
      background-image: url('https://website-juniorliu.s3.us-east-2.amazonaws.com/res/border1.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      padding: 70px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
      width: fit-content;
      height: fit-content;
    }
    
    .profile-image {
      max-width: 360px;
      max-height: 360px;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    
    .navigation-icons {
      display: flex;
      gap: 4rem;
      opacity: 1;
      transform: translateY(0);
    }
    
    .navigation-icons.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 10px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
    }
    
    .nav-icon:hover {
      transform: translateY(-5px);
      border-color: rgba(255, 255, 255, 0.6);
    }
    
    .nav-icon .icon {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
    
    @media (max-width: 768px) {
      .home-container {
        padding: 1rem 0.5rem;
      }
      
      .profile-frame {
        background-size: cover;
        padding: 50px;
      }
      
      .profile-image {
        max-width: 300px;
        max-height: 300px;
      }
      
      .navigation-icons {
        gap: 2.5rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .nav-icon .icon {
        width: 50px;
        height: 50px;
      }
      
      .nav-icon {
        min-width: 70px;
        min-height: 70px;
      }
    }
    
    @media (max-width: 480px) {
      .home-container {
        padding: 0.5rem 0.25rem;
      }
      
      .profile-frame {
        background-size: cover;
        padding: 40px;
      }
      
      .profile-image {
        max-width: 250px;
        max-height: 250px;
      }
      
      .navigation-icons {
        gap: 1.5rem;
      }
      
      .nav-icon .icon {
        width: 40px;
        height: 40px;
      }
      
      .nav-icon {
        min-width: 60px;
        min-height: 60px;
        padding: 8px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  // S3 URLs for assets
  readonly profilePictures = [
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/jr1.jpg',
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/jr2.jpg',
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/jr3.jpg',
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/jr4.jpg'
  ];
  readonly linkedinIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/linkedin.png';
  readonly cvUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/resume-25.pdf';
  readonly cvIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/cv.png';
  readonly mjClubIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/mj.png';
  readonly porscheIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/porsche.jpg';
  readonly tennisIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/RF.jpg';
  
  currentProfileIndex = 0;
  
  get currentProfilePicture(): string {
    return this.profilePictures[this.currentProfileIndex];
  }
  
  ngOnInit() {
    // Component initialization
  }
  
  nextProfilePicture() {
    this.currentProfileIndex = (this.currentProfileIndex + 1) % this.profilePictures.length;
    console.log(`Switched to profile picture ${this.currentProfileIndex + 1}`);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="profile-container" (click)="nextProfilePicture()">
        <img 
          [src]="currentProfilePicture" 
          [alt]="'Profile Picture ' + (currentProfileIndex + 1)"
          class="profile-image">
      </div>
      
      <div class="navigation-icons">
        <div class="nav-icon" title="LinkedIn" (click)="navigateWithAnimation('https://www.linkedin.com/in/junior-liu-548241102/', true, $event)">
          <img [src]="linkedinIconUrl" alt="LinkedIn" class="icon">
        </div>
        
        <div class="nav-icon" title="CV" (click)="navigateWithAnimation('/resume', false, $event)">
          <img [src]="cvIconUrl" alt="CV" class="icon">
        </div>
        
        <div class="nav-icon" title="MJClub" (click)="navigateWithAnimation('http://www.seattlemj.com', true, $event)">
          <img [src]="mjClubIconUrl" alt="MJClub" class="icon">
        </div>
        
        <div class="nav-icon" title="Car Page" (click)="navigateWithAnimation('/car', false, $event)">
          <img [src]="porscheIconUrl" alt="Car Page" class="icon">
        </div>
        
        <div class="nav-icon" title="Tennis Page" (click)="navigateWithAnimation('/tennis', false, $event)">
          <img [src]="tennisIconUrl" alt="Tennis Page" class="icon">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background: black;
      overflow-x: hidden;
      padding: 3rem 2rem 0;
    }
    
    .profile-container {
      cursor: pointer;
      transition: transform 0.3s ease;
      margin-bottom: 3rem;
    }
    
    .profile-container:hover {
      transform: scale(1.05);
    }
    
    .profile-image {
      max-width: 306px;
      max-height: 306px;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    }
    
    .navigation-icons {
      display: flex;
      gap: 4rem;
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
      cursor: pointer;
    }
    
    .nav-icon:hover {
      border-color: rgba(255, 255, 255, 0.6);
      animation: doubleJump 0.6s ease-in-out;
    }
    
    .nav-icon.animating {
      animation: doubleJump 0.6s ease-in-out;
    }
    
    @keyframes doubleJump {
      0% {
        transform: translateY(0px);
      }
      25% {
        transform: translateY(-10px);
      }
      50% {
        transform: translateY(0px);
      }
      75% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    
    .nav-icon .icon {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
    
    @media (max-width: 768px) {
      .home-container {
        padding: 2rem 1rem 0;
      }
      
      .profile-image {
        max-width: 250px;
        max-height: 250px;
      }
      
      .navigation-icons {
        gap: 1.2rem;
        flex-wrap: nowrap;
        justify-content: center;
        overflow-x: auto;
        padding: 0 1rem;
      }
      
      .nav-icon {
        min-width: 55px;
        min-height: 55px;
        flex-shrink: 0;
      }
      
      .nav-icon .icon {
        width: 45px;
        height: 45px;
      }
    }
    
    @media (max-width: 480px) {
      .home-container {
        padding: 1rem 0.5rem 0;
      }
      
      .profile-image {
        max-width: 200px;
        max-height: 200px;
      }
      
      .navigation-icons {
        gap: 0.8rem;
        flex-wrap: nowrap;
        justify-content: center;
        overflow-x: auto;
        padding: 0 0.5rem;
      }
      
      .nav-icon {
        min-width: 50px;
        min-height: 50px;
        padding: 8px;
        flex-shrink: 0;
      }
      
      .nav-icon .icon {
        width: 38px;
        height: 38px;
      }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly profilePictures = [
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/pic1.jpg',
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/pic2.jpg',
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/pic3.jpg',
    'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/pic4.jpg'
  ];
  readonly linkedinIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/linkedin.png';
  readonly cvIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/cv.png';
  readonly mjClubIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/mj.png';
  readonly porscheIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/porsche.jpg';
  readonly tennisIconUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/RF.jpg';
  
  currentProfileIndex = 0;
  private navigationTimeout: any;
  private isNavigating = false;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Listen for navigation events to reset state
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Reset navigation state when returning to page
        this.isNavigating = false;
        if (this.navigationTimeout) {
          clearTimeout(this.navigationTimeout);
          this.navigationTimeout = null;
        }
        // Remove any remaining animation classes
        document.querySelectorAll('.nav-icon.animating').forEach(el => {
          el.classList.remove('animating');
        });
      });
  }
  
  ngOnDestroy() {
    if (this.navigationTimeout) {
      clearTimeout(this.navigationTimeout);
    }
  }
  
  get currentProfilePicture(): string {
    return this.profilePictures[this.currentProfileIndex];
  }
  
  nextProfilePicture() {
    this.currentProfileIndex = (this.currentProfileIndex + 1) % this.profilePictures.length;
  }
  
  navigateWithAnimation(url: string, isExternal: boolean, event?: Event) {
    // Prevent multiple navigation attempts
    if (this.isNavigating) {
      return;
    }
    
    if (event) {
      event.preventDefault();
    }
    
    this.isNavigating = true;
    
    // Get the clicked element to add animation class
    const target = event?.currentTarget as HTMLElement;
    const navIcon = target?.closest('.nav-icon') as HTMLElement || target;
    
    if (navIcon) {
      // Add animation class
      navIcon.classList.add('animating');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        navIcon.classList.remove('animating');
      }, 600); // Animation duration is 0.6s
    }
    
    // Navigate after animation starts (1.5 second delay to ensure animation is visible)
    this.navigationTimeout = setTimeout(() => {
      if (isExternal) {
        // For external links, try multiple approaches
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          // Fallback if popup is blocked
          window.location.href = url;
        }
      } else {
        this.router.navigate([url]);
      }
      this.isNavigating = false;
    }, 1500);
  }
}

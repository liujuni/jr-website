import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="profile-container" #profileContainer>
        <div class="click-hint">
          <span class="finger-point">👇</span>
          <span class="click-text">Click me!</span>
        </div>
        <img 
          [src]="currentProfilePicture" 
          [alt]="'Profile Picture ' + (currentProfileIndex + 1)"
          class="profile-image">
        <div class="invisible-click-area" 
             (click)="nextProfilePicture()"
             (mouseenter)="onProfileAreaEnter()"
             (mouseleave)="onProfileAreaLeave()"></div>
      </div>
      
      <div class="navigation-icons">
        <div class="nav-icon" title="LinkedIn" (click)="navigateWithAnimation('https://www.linkedin.com/in/junior-liu-548241102/', true, $event)">
          <img [src]="linkedinIconUrl" alt="LinkedIn" class="icon">
        </div>
        
        <div class="nav-icon" title="Resume" (click)="navigateWithAnimation('/resume', false, $event)">
          <img [src]="cvIconUrl" alt="Resume" class="icon">
        </div>
        
        <div class="nav-icon" title="Mah Jong Club" (click)="navigateWithAnimation('http://www.seattlemj.com', true, $event)">
          <img [src]="mjClubIconUrl" alt="Mah Jong Club" class="icon">
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
      background: rgba(14, 7, 19);
      overflow: visible;
      padding: 50px 0 0 0;
      margin: 0;
      position: relative;
    }
    
    .profile-container {
      transition: all 0.3s ease;
      margin: -100px 2rem 0 !important;
      padding: 0;
      position: relative;
      background: rgba(14, 7, 19);
    }
    
    .invisible-click-area {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 350px;
      height: 465px;
      transform: translate(-50%, -50%);
      background: transparent;
      cursor: pointer;
      z-index: 5;
    }
    
    .click-hint {
      position: absolute;
      top: 85px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      z-index: 10;
    }
    
    .finger-point {
      font-size: 24px;
      animation: pointDown 2s ease-in-out infinite;
    }
    
    .click-text {
      color: white;
      font-size: 14px;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.7);
      padding: 4px 8px;
      border-radius: 4px;
    }
    
    @keyframes pointDown {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(5px);
      }
    }
    
    .profile-container.hovering {
      transform: scale(1.05) !important;
      margin: -100px 2rem 0 !important;
    }
    
    .profile-image {
      max-width: 1464px;
      max-height: 1464px;
      width: auto;
      height: auto;
      object-fit: contain;
      object-position: center;
      display: block;
      margin: 0 auto;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
      background: rgba(14, 7, 19);
      border: none;
      outline: none;
    }
    
    .navigation-icons {
      display: flex;
      gap: 4rem;
      margin: 3rem 2rem 0;
      transform: translateY(-110px);
      padding: 30px 0 20px 0;
      overflow: visible;
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
    
    /* Disable hover animation on mobile */
    @media (max-width: 768px) {
      .nav-icon:hover {
        border-color: rgba(255, 255, 255, 0.6);
        animation: none;
      }
    }
    
    /* Desktop: no click animation (only hover) */
    .nav-icon.animating {
      animation: none;
    }
    
    /* Mobile: scale/zoom effect for click */
    @media (max-width: 768px) {
      .nav-icon.animating {
        transform: scale(1.1);
      }
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
      .profile-container {
        margin: -100px 1rem 0 !important;
      }
      
      .navigation-icons {
        margin: 3rem 1rem 0;
        padding: 30px 1rem 20px 1rem;
        overflow: visible;
        gap: 1.2rem;
        flex-wrap: nowrap;
        justify-content: center;
        overflow-x: auto;
      }
      
      .profile-image {
        max-width: 1197px;
        max-height: 1197px;
      }
      
      .invisible-click-area {
        width: 350px;
        height: 465px;
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
      .profile-container {
        margin: -100px 0.5rem 0 !important;
      }
      
      .navigation-icons {
        margin: 3rem 0.5rem 0;
        padding: 30px 0.5rem 20px 0.5rem;
        overflow: visible;
        gap: 0.8rem;
        flex-wrap: nowrap;
        justify-content: center;
        overflow-x: auto;
      }
      
      .profile-image {
        max-width: 861px;
        max-height: 861px;
      }
      
      .invisible-click-area {
        width: 315px;
        height: 419px;
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
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('profileContainer') profileContainer!: ElementRef<HTMLDivElement>;
  
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
  private animationTimeout: any;
  private isNavigating = false;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Listen for navigation events to reset state
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Immediate reset to prevent any erroneous animations
        this.resetNavigationState();
        
        // Small delay to ensure DOM is fully updated after navigation
        setTimeout(() => {
          this.scrollToTop();
        }, 50);
      });
    
    // Initial cleanup
    setTimeout(() => this.resetNavigationState(), 100);
  }

  ngAfterViewInit() {
    // Scroll to top after view is initialized (this handles the initial load case)
    this.scrollToTop();
  }

  private resetNavigationState() {
    this.isNavigating = false;
    this.clearTimeouts();
    
    // Reset animation states
    document.querySelectorAll('.nav-icon').forEach(navIcon => {
      navIcon.classList.remove('animating');
      
      const element = navIcon as HTMLElement;
      element.style.animation = 'none';
      element.style.transform = '';
      element.offsetHeight; // Trigger reflow
      element.style.animation = '';
      element.style.transform = '';
    });
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  
  ngOnDestroy() {
    this.clearTimeouts();
  }

  private clearTimeouts() {
    if (this.navigationTimeout) {
      clearTimeout(this.navigationTimeout);
      this.navigationTimeout = null;
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }
  
  get currentProfilePicture(): string {
    return this.profilePictures[this.currentProfileIndex];
  }
  
  nextProfilePicture() {
    this.currentProfileIndex = (this.currentProfileIndex + 1) % this.profilePictures.length;
  }
  
  onProfileAreaEnter() {
    if (this.profileContainer) {
      this.profileContainer.nativeElement.classList.add('hovering');
    }
  }
  
  onProfileAreaLeave() {
    if (this.profileContainer) {
      this.profileContainer.nativeElement.classList.remove('hovering');
    }
  }
  
  navigateWithAnimation(url: string, isExternal: boolean, event?: Event) {
    // Prevent multiple navigation attempts
    if (this.isNavigating) {
      return;
    }
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      if (isExternal) {
        event.returnValue = false;
      }
    }
    
    this.isNavigating = true;
    
    const target = event?.currentTarget as HTMLElement;
    const navIcon = target?.closest('.nav-icon') as HTMLElement || target;
    const isMobileDevice = this.isMobile();
    
    // Handle mobile animation
    if (navIcon && isMobileDevice) {
      document.querySelectorAll('.nav-icon.animating').forEach(el => {
        el.classList.remove('animating');
      });
      
      navIcon.classList.add('animating');
      
      this.animationTimeout = setTimeout(() => {
        navIcon?.classList.remove('animating');
        this.animationTimeout = null;
      }, 300);
    }
    
    // Handle navigation
    const navigate = () => {
      if (isExternal) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        this.router.navigate([url]);
      }
      this.isNavigating = false;
    };
    
    if (isMobileDevice) {
      this.navigationTimeout = setTimeout(navigate, 600);
    } else {
      navigate();
    }
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  }
}

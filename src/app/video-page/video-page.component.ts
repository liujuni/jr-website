import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-page-container" (click)="onContainerClick()">
      <video 
        #introVideo 
        class="fullscreen-video" 
        muted 
        playsinline
        webkit-playsinline
        preload="metadata"
        controls="false"
        (ended)="onVideoEnd()"
        (loadeddata)="onVideoLoaded()"
        (canplay)="onVideoCanPlay()"
        (canplaythrough)="onVideoCanPlay()"
        (click)="onVideoClick()"
        (touchstart)="onVideoTouch()">
        <source [src]="videoUrl" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `,
  styles: [`
    .video-page-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #0c140c;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .fullscreen-video {
      max-width: 100vw;
      max-height: 100vh;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    @media (max-width: 768px) {
      .video-page-container {
        padding: 0.5rem;
      }
      
      .fullscreen-video {
        max-width: 100vw;
        max-height: calc(100vh - 1rem);
      }
    }
    
    @media (max-width: 480px) {
      .video-page-container {
        padding: 0;
      }
      
      .fullscreen-video {
        max-width: 100vw;
        max-height: 100vh;
      }
    }
  `]
})
export class VideoPageComponent implements AfterViewInit {
  @ViewChild('introVideo') introVideo!: ElementRef<HTMLVideoElement>;
  
  readonly videoUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/is-that-you.mp4';
  
  constructor(private router: Router) {}
  
  ngAfterViewInit() {
    // Initialize video for iOS compatibility
    setTimeout(() => {
      this.initializeVideoForIOS();
    }, 100);
  }

  private initializeVideoForIOS() {
    if (this.introVideo && this.introVideo.nativeElement) {
      const video = this.introVideo.nativeElement;
      
      // Set iOS-specific attributes
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('playsinline', 'true');
      video.muted = true;
      
      // Force load video metadata on iOS
      video.load();
      
      // Add iOS-specific event listeners
      video.addEventListener('loadstart', () => {
        console.log('iOS Video load started');
      });
      
      video.addEventListener('loadedmetadata', () => {
        console.log('iOS Video metadata loaded');
        this.addClickToPlayButton();
      });
      
      video.addEventListener('canplay', () => {
        console.log('iOS Video can play');
        this.addClickToPlayButton();
      });
      
      // Fallback: show button after timeout if events don't fire
      setTimeout(() => {
        if (!document.querySelector('.click-to-play')) {
          this.addClickToPlayButton();
        }
      }, 3000);
    }
  }
  
  
  private addClickToPlayButton() {
    // Add a click overlay to allow user to play the video
    const container = document.querySelector('.video-page-container');
    if (container && !container.querySelector('.click-to-play')) {
      const overlay = document.createElement('div');
      overlay.className = 'click-to-play';
      overlay.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 25px 45px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        z-index: 1000;
        touch-action: manipulation;
        user-select: none;
        min-width: 250px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        border: 2px solid rgba(255, 255, 255, 0.3);
      `;
      overlay.textContent = 'Tap to Play Video';
      overlay.addEventListener('click', () => {
        this.playVideo();
      });
      overlay.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.playVideo();
      });
      container.appendChild(overlay);
    }
  }
  
  onVideoLoaded() {
    console.log('Video loaded and ready to play');
    // Show click to play button since autoplay is disabled
    this.addClickToPlayButton();
  }
  
  onVideoCanPlay() {
    console.log('Video can play');
    // Show click to play button since autoplay is disabled
    this.addClickToPlayButton();
  }
  
  onVideoEnd() {
    console.log('Video ended, navigating to index');
    // Navigate to index page when video ends
    this.router.navigate(['/index']);
  }
  
  private playVideo() {
    if (this.introVideo && this.introVideo.nativeElement) {
      const video = this.introVideo.nativeElement;
      
      // Ensure video is ready for iOS
      if (video.readyState >= 2) {
        if (video.paused) {
          // Promise-based play for iOS compatibility
          const playPromise = video.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log('Video started playing');
              this.removeClickToPlayOverlay();
            }).catch(error => {
              console.log('Video play failed:', error);
              // Fallback: show play button if autoplay fails
              this.addClickToPlayButton();
            });
          }
        }
      } else {
        // Video not ready, wait a bit and try again
        setTimeout(() => {
          this.playVideo();
        }, 500);
      }
    }
  }
  
  onContainerClick() {
    this.playVideo();
  }
  
  onVideoClick() {
    this.playVideo();
  }

  onVideoTouch() {
    // Handle touch events for iOS
    this.playVideo();
  }

  private removeClickToPlayOverlay() {
    const overlay = document.querySelector('.click-to-play');
    if (overlay) {
      overlay.remove();
    }
  }
}

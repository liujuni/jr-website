import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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
        (ended)="onVideoEnd()"
        (loadeddata)="onVideoLoaded()"
        (canplay)="onVideoCanPlay()"
        (click)="onVideoClick()">
        <source [src]="videoUrl" type="video/mp4">
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
  `]
})
export class VideoPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('introVideo') introVideo!: ElementRef<HTMLVideoElement>;
  
  readonly videoUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/is-that-you.mp4';
  private fallbackTimeout: any;
  
  constructor(private router: Router) {}
  
  ngAfterViewInit() {
    // No automatic play attempts - wait for user to click
    
    // Add fallback timeout - navigate to index after 30 seconds if user doesn't interact
    this.fallbackTimeout = setTimeout(() => {
      console.log('Video timeout reached, navigating to index');
      this.router.navigate(['/index']);
    }, 30000); // Extended to 30 seconds
  }
  
  private attemptVideoPlay() {
    const attempts = [100, 500, 1000, 2000];
    attempts.forEach(delay => {
      setTimeout(() => {
        if (this.introVideo && this.introVideo.nativeElement) {
          const video = this.introVideo.nativeElement;
          
          // Ensure video is ready
          if (video.readyState >= 3) {
            video.play().catch(error => {
              console.log(`Video play attempt failed after ${delay}ms:`, error);
              // Add user interaction fallback
              if (error.name === 'NotAllowedError') {
                this.addClickToPlayFallback();
              }
            });
          }
        }
      }, delay);
    });
  }
  
  private addClickToPlayFallback() {
    // Add a click overlay if autoplay fails
    const container = document.querySelector('.video-page-container');
    if (container && !container.querySelector('.click-to-play')) {
      const overlay = document.createElement('div');
      overlay.className = 'click-to-play';
      overlay.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 18px;
        z-index: 1000;
      `;
      overlay.textContent = 'Click to Play Video';
      overlay.addEventListener('click', () => {
        if (this.introVideo && this.introVideo.nativeElement) {
          this.introVideo.nativeElement.play().catch(console.error);
        }
        overlay.remove();
      });
      container.appendChild(overlay);
    }
  }
  
  onVideoLoaded() {
    console.log('Video loaded and ready to play');
    // Video is loaded but waiting for user interaction
  }
  
  onVideoCanPlay() {
    console.log('Video can play');
    // Video is ready but waiting for user to click play
  }
  
  onVideoEnd() {
    console.log('Video ended, navigating to index');
    // Clear the fallback timeout since video ended naturally
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
    }
    // Navigate to index page when video ends
    this.router.navigate(['/index']);
  }
  
  onContainerClick() {
    // Handle clicks on the container to play video
    if (this.introVideo && this.introVideo.nativeElement) {
      const video = this.introVideo.nativeElement;
      if (video.paused) {
        // Clear the timeout when user starts playing
        if (this.fallbackTimeout) {
          clearTimeout(this.fallbackTimeout);
        }
        video.play().catch(error => {
          console.log('Video play failed on container click:', error);
        });
      }
    }
  }
  
  onVideoClick() {
    // Handle direct clicks on the video
    if (this.introVideo && this.introVideo.nativeElement) {
      const video = this.introVideo.nativeElement;
      if (video.paused) {
        // Clear the timeout when user starts playing
        if (this.fallbackTimeout) {
          clearTimeout(this.fallbackTimeout);
        }
        video.play().catch(error => {
          console.log('Video play failed on video click:', error);
        });
      }
    }
  }
  
  ngOnDestroy() {
    // Clean up timeout to prevent memory leaks
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
    }
  }
}

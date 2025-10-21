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
    // No automatic play attempts - wait for user to click
    // No timeout - let user stay on video page as long as they want
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
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 18px;
        z-index: 1000;
        touch-action: manipulation;
        user-select: none;
        min-width: 200px;
        text-align: center;
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
      if (video.paused) {
        video.play().then(() => {
          this.removeClickToPlayOverlay();
        }).catch(error => {
          console.log('Video play failed:', error);
        });
      }
    }
  }
  
  onContainerClick() {
    this.playVideo();
  }
  
  onVideoClick() {
    this.playVideo();
  }

  private removeClickToPlayOverlay() {
    const overlay = document.querySelector('.click-to-play');
    if (overlay) {
      overlay.remove();
    }
  }
}

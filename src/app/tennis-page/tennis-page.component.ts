import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tennis-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="under-construction">
      <a routerLink="/index" class="back-button">← Back to Home</a>
      <div class="content">
        <p>Under Construction</p>
      </div>
    </div>
  `,
  styles: [`
    .under-construction {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: black;
      color: white;
      position: relative;
    }
    
    .back-button {
      position: absolute;
      top: 2rem;
      left: 2rem;
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      text-decoration: none;
      border-radius: 5px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      z-index: 100;
    }
    
    .content {
      text-align: center;
    }
    
    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      color: #ccc;
    }
    
    .back-button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .back-button {
        top: 1rem;
        left: 1rem;
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
      
      p {
        font-size: 1.2rem;
        padding: 0 1rem;
      }
    }
    
    @media (max-width: 480px) {
      .back-button {
        top: 0.5rem;
        left: 0.5rem;
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
      }
      
      p {
        font-size: 1rem;
        padding: 0 0.5rem;
      }
    }
  `]
})
export class TennisPageComponent implements OnInit, AfterViewInit {
  
  ngOnInit() {
    this.scrollToTop();
  }

  ngAfterViewInit() {
    this.scrollToTop();
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // Fallback for older browsers or mobile
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

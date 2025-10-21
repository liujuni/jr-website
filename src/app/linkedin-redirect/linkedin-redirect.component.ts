import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-linkedin-redirect',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="redirect-container">
      <a routerLink="/index" class="back-button">← Back to Home</a>
      <div class="redirect-content">
        <div class="spinner"></div>
        <h2>Redirecting to LinkedIn...</h2>
        <p>Please wait while we redirect you to LinkedIn profile.</p>
      </div>
    </div>
  `,
  styles: [`
    .redirect-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(14, 7, 19);
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
    
    .back-button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    
    .redirect-content {
      text-align: center;
      max-width: 400px;
      padding: 2rem;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 2rem auto;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: white;
    }
    
    p {
      font-size: 1.1rem;
      color: #ccc;
      margin: 0;
    }
    
    @media (max-width: 768px) {
      .back-button {
        top: 1rem;
        left: 1rem;
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
      
      .redirect-content {
        padding: 1rem;
      }
      
      h2 {
        font-size: 1.5rem;
      }
      
      p {
        font-size: 1rem;
      }
    }
    
    @media (max-width: 480px) {
      .back-button {
        top: 0.5rem;
        left: 0.5rem;
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
      }
      
      h2 {
        font-size: 1.3rem;
      }
    }
  `]
})
export class LinkedInRedirectComponent implements OnInit {
  private readonly linkedinUrl = 'https://www.linkedin.com/in/junior-liu-548241102/';
  
  ngOnInit() {
    // Open LinkedIn in new tab immediately when page loads
    // This preserves the user action context from the original click
    window.open(this.linkedinUrl, '_blank', 'noopener,noreferrer');
  }
}

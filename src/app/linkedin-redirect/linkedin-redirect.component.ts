import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-linkedin-redirect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="redirect-container">
      <div class="redirect-content">
        <div class="spinner"></div>
        <h2>Redirecting to LinkedIn...</h2>
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
    console.log('LinkedIn redirect page loaded, attempting to open:', this.linkedinUrl);
    const result = window.open(this.linkedinUrl, '_blank', 'noopener,noreferrer');
    console.log('window.open result:', result);
    
    // If window.open fails, try alternative approach
    if (!result || result.closed) {
      console.log('window.open was blocked, trying alternative');
      setTimeout(() => {
        window.location.href = this.linkedinUrl;
      }, 100);
    }
  }
}

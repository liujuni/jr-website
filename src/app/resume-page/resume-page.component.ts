import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="resume-container">
      <!-- Back Button - Top Left -->
      <a routerLink="/index" class="back-button">← Back to Home</a>
      
      <!-- Download Button - Center -->
      <div class="download-section">
        <button (click)="downloadPdf()" class="download-button">
          Download PDF
        </button>
      </div>
      
      <!-- Resume Display -->
      <div class="resume-display">
        <iframe 
          [src]="safePdfUrl" 
          class="pdf-viewer"
          title="Resume PDF"
          frameborder="0"
          allowfullscreen
          (load)="onIframeLoad()"
          (error)="onIframeError()">
          <p>Your browser does not support PDFs. 
            <button (click)="downloadPdf()" style="background: none; border: none; color: #007bff; text-decoration: underline; cursor: pointer;">Download the PDF</button>
          </p>
        </iframe>
        
        <!-- Fallback for browsers that don't support iframe PDF -->
        <div class="resume-fallback" *ngIf="showFallback">
          <div class="fallback-content">
            <h2>Resume Preview</h2>
            <p>Click the "Download PDF" button above to view your resume.</p>
            <button (click)="downloadPdf()" class="download-button-fallback">
              Download Resume PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resume-container {
      min-height: 100vh;
      background: white;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    .download-section {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
      background: rgba(255, 255, 255, 0.95);
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .download-button {
      display: inline-block;
      padding: 1rem 2rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      border: 2px solid #0056b3;
      transition: all 0.3s ease;
      font-weight: bold;
      font-size: 1.1rem;
      cursor: pointer;
      font-family: inherit;
    }
    
    .download-button:hover {
      background: #0056b3;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
    }
    
    .back-button {
      position: absolute;
      top: 2rem;
      left: 2rem;
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background: #4a4a4a;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      border: 2px solid #666666;
      transition: all 0.3s ease;
      z-index: 100;
    }
    
    .back-button:hover {
      background: #5a5a5a;
      transform: translateY(-2px);
    }
    
    .resume-display {
      flex: 1;
      padding-top: 100px; /* Account for fixed header */
    }
    
    .pdf-viewer {
      width: 100%;
      height: calc(100vh - 100px);
      border: none;
      background: white;
    }
    
    .resume-fallback {
      display: block;
      padding: 2rem;
      text-align: center;
      color: #333;
      background: white;
      border: 2px dashed #ccc;
      margin: 2rem;
      border-radius: 8px;
    }
    
    .fallback-content h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #333;
    }
    
    .fallback-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
    }
    
    .download-button-fallback {
      display: inline-block;
      padding: 1.5rem 3rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      border: 2px solid #0056b3;
      transition: all 0.3s ease;
      font-weight: bold;
      font-size: 1.2rem;
      cursor: pointer;
      font-family: inherit;
    }
    
    .download-button-fallback:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .download-section {
        flex-direction: column;
        gap: 1rem;
        padding: 0.8rem;
      }
      
      .download-button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
      }
      
      .back-button {
        padding: 0.6rem 1.2rem;
        font-size: 0.8rem;
      }
      
      .resume-display {
        padding-top: 120px;
      }
      
      .pdf-viewer {
        height: calc(100vh - 120px);
      }
    }
    
    @media (max-width: 480px) {
      .download-section {
        padding: 0.5rem;
      }
      
      .download-button {
        padding: 0.7rem 1.2rem;
        font-size: 0.9rem;
      }
      
      .resume-display {
        padding-top: 140px;
      }
      
      .pdf-viewer {
        height: calc(100vh - 140px);
      }
    }
  `]
})
export class ResumePageComponent implements OnInit {
  readonly resumePdfUrl = 'https://website-juniorliu.s3.us-east-2.amazonaws.com/res/resume-25.pdf';
  safePdfUrl: SafeResourceUrl;
  showFallback = false;
  
  constructor(private sanitizer: DomSanitizer) {
    // Initialize with direct PDF URL first
    const pdfViewerUrl = `${this.resumePdfUrl}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`;
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfViewerUrl);
  }
  
  ngOnInit() {
    // Check if PDF can be displayed
    setTimeout(() => {
      this.checkPdfSupport();
    }, 1000);
    
    // Alternative approach: try to load PDF and show fallback if it fails
    setTimeout(() => {
      this.testPdfLoad();
    }, 3000);
  }
  
  private checkPdfSupport() {
    // Basic check for PDF support
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    
    // Most modern browsers support PDF in iframe, but we can add fallback if needed
    if (!isChrome && !isFirefox) {
      // Safari and some other browsers might need fallback
      this.showFallback = true;
    }
  }
  
  private testPdfLoad() {
    // Test if the iframe actually loaded the PDF
    const iframe = document.querySelector('.pdf-viewer') as HTMLIFrameElement;
    if (iframe) {
      try {
        // Check if iframe has content
        if (iframe.contentDocument === null || iframe.contentWindow === null) {
          console.log('PDF may not be loading due to CORS restrictions');
          this.tryGoogleViewer();
        }
      } catch (e) {
        console.log('CORS restriction detected, trying Google Viewer');
        this.tryGoogleViewer();
      }
    }
  }
  
  onIframeLoad() {
    console.log('Iframe loaded successfully');
    this.showFallback = false;
  }
  
  onIframeError() {
    console.log('Iframe failed to load, trying Google Viewer');
    this.tryGoogleViewer();
  }
  
  private tryGoogleViewer() {
    // Try Google Viewer as fallback
    const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(this.resumePdfUrl)}&embedded=true`;
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleViewerUrl);
    
    // After a delay, if Google Viewer also doesn't work, show the fallback UI
    setTimeout(() => {
      this.showFallback = true;
    }, 5000);
  }

  async downloadPdf() {
    console.log('Starting PDF download, URL:', this.resumePdfUrl);
    
    // Method 1: Try XMLHttpRequest blob download (should bypass extensions)
    try {
      console.log('Attempting XMLHttpRequest blob download...');
      const blob = await this.fetchPdfAsBlob();
      if (blob && blob.size > 0) {
        console.log('Blob download successful, size:', blob.size);
        this.downloadBlob(blob, 'resume-25.pdf');
        return;
      } else {
        console.log('Blob download failed - empty or invalid blob');
      }
    } catch (error) {
      console.log('Blob download failed:', error);
    }

    // Method 2: Try using a different approach with window.location
    try {
      console.log('Trying window.location approach...');
      // Create a temporary input element to trigger download
      const input = document.createElement('input');
      input.type = 'hidden';
      input.value = this.resumePdfUrl;
      
      // Try setting location directly
      const downloadFrame = document.createElement('iframe');
      downloadFrame.style.display = 'none';
      downloadFrame.style.width = '0';
      downloadFrame.style.height = '0';
      document.body.appendChild(downloadFrame);
      
      // Try to set the iframe src to trigger download
      downloadFrame.src = this.resumePdfUrl + '?download=1';
      
      // Clean up
      setTimeout(() => {
        if (document.body.contains(downloadFrame)) {
          document.body.removeChild(downloadFrame);
        }
      }, 3000);
      
      console.log('Iframe download method attempted');
    } catch (error) {
      console.log('Iframe method failed:', error);
    }

    // Method 3: Show user guidance
    console.log('All automatic methods failed. Extension is interfering.');
    this.showDownloadInstructions();
  }

  private async fetchPdfAsBlob(): Promise<Blob | null> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.resumePdfUrl, true);
      xhr.responseType = 'blob';
      
      // Add timeout
      xhr.timeout = 10000; // 10 seconds
      
      xhr.onload = () => {
        console.log('XHR onload - status:', xhr.status, 'readyState:', xhr.readyState);
        if (xhr.status === 200 && xhr.response instanceof Blob) {
          console.log('PDF blob received, size:', xhr.response.size, 'type:', xhr.response.type);
          resolve(xhr.response);
        } else {
          console.log('Failed to fetch PDF - status:', xhr.status, 'response type:', typeof xhr.response);
          resolve(null);
        }
      };
      
      xhr.onerror = (event) => {
        console.log('XHR error occurred:', event);
        resolve(null);
      };
      
      xhr.ontimeout = () => {
        console.log('XHR timeout occurred');
        resolve(null);
      };
      
      xhr.onabort = () => {
        console.log('XHR aborted');
        resolve(null);
      };
      
      try {
        xhr.send();
      } catch (error) {
        console.log('XHR send failed:', error);
        resolve(null);
      }
    });
  }

  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
    
    console.log('Blob download completed');
  }

  private showDownloadInstructions() {
    // Create a more user-friendly notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #333;
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 10000;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    
    notification.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: #ffcc00;">Download Blocked by Extension</h3>
      <p style="margin: 0 0 15px 0; font-size: 14px;">
        Your PDF viewer extension is preventing automatic download.
      </p>
      <p style="margin: 0 0 20px 0; font-size: 14px;">
        <strong>Solution:</strong> Right-click the "Download PDF" button and select "Save link as..."
      </p>
      <button onclick="this.parentElement.remove()" style="
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      ">Got it</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 10000);
  }
}

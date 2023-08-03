import { Component, OnInit, OnChanges, ChangeDetectionStrategy, SimpleChanges, Renderer2, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef    } from '@angular/core';
import { WebClientService } from './web-client.service';
import { HttpClient, HttpClientModule, HttpResponse   } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs/internal/Subject';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { KendoComponent } from './kendo/kendo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit  {
  title = 'Hello my app!';
  public data: any;
  public data2: any;
  filename: string = 'http://localhost:4200/assets/sample.pdf';
  public samplefile: any;
  iconname: any;
  public sampleHtml: any;
  public sampleHtml2: any;
  public temp: any;
  public isEmbedded: boolean;
  public isStandaloine: boolean;
  public isBigPDF: boolean;

  @ViewChild('divPDF', { static: false })
  divPDF!: ElementRef<any>; 

  @ViewChild('divViewer', { static: false })
  divViewer!: ElementRef<any>; 

//  @ViewChild("divMessages", { read: ElementRef }) private divMessages: ElementRef | undefined;

 constructor(private webClientService: WebClientService, private sanitizer: DomSanitizer, private renderer:Renderer2, private cdr: ChangeDetectorRef) 
 { 
  this.isEmbedded = true;
  this.isStandaloine = false;
  this.isBigPDF = false;

 }

 handleButtonClick() {
  this.isEmbedded = !this.isEmbedded;
  this.isStandaloine = false;
  this.isBigPDF = false;
  this.getPDFFileFromService(); 
  console.log('Preview is toggled!');
}

handleButtonClick2() {
  this.isStandaloine = true;
  this.isBigPDF = false;
  this.getPDFFileFromService(); 
  console.log('Preview is toggled!');
}

handleButtonClick3() {
  this.isStandaloine = false;
  this.isBigPDF = true;
  this.isEmbedded = true;  
  this.getPDFFileFromService(); 
  console.log('Preview is toggled!');
}

 ngAfterViewInit() {
  // this.renderer.setProperty(this.divMessages.nativeElement,'innerHTML',"Hello Angular")
  // this.renderer.setStyle(this.divMessages.nativeElement, 'color', 'red');
//  this.renderer.setStyle(this.divMessages.nativeElement, 'color', 'red');

//this.temp = '<iframe src="' + 'http://localhost:8888/web/test0.html?file=target2.pdf' + '"  width="100%" height="600px"></iframe>';
//if (this.data != undefined)
{

    // Manually trigger change detection
    this.cdr.detectChanges();

  // this.temp = '<iframe src="' + this.data + '"  width="100%" height="600px"></iframe>';
  // this.renderer.setProperty(this.divMessages.nativeElement,'innerHTML', this.temp);  
}

/* //create the DOM element 
let li=this.renderer.createElement('li');

//create text for the element
const text = this.renderer.createText('element text:');

//append text to li element
  this.renderer.appendChild(li, text);

//Now append the li tag to divMessages div
this.renderer.appendChild(this.divMessages.nativeElement,li); */

}

  ngOnChanges(changes: SimpleChanges): void {
/*     this.samplefile = 'http://localhost:4200/assets/sample.pdf';
    this.samplefile = 'assets/sample.pdf';
    this.iconname = 'http://localhost:4200/assets/favicon.ico';
    //throw new Error('Method not implemented.');
    this.sampleHtml = '<embed src="${this.samplefile}" type="application/pdf">'; */
  }
//constructor() { }

  ngOnInit() {
    this.getPDFFileFromService();
    this.isEmbedded = true;
    // this.getPDFViewerFromMozilla();       
    //this.getFileFromService();
//    this.loadPDF();
/*   this.samplefile = 'http://localhost:4200/assets/sample.pdf';
  this.iconname = 'http://localhost:4200/assets/favicon.ico';
  this.sampleHtml = '<embed src=' + '"' + this.samplefile + '"' + ' ' + 'type="application/pdf">';
  this.sampleHtml2 = 'http://localhost:8888/web/test0.html?file=target2.pdf'; */
  }

/*  getPDFViewerFromMozilla()
 {  
  this.data = 'http://localhost:8888/web/viewer.html?file=http://localhost:8888/web/target2.pdf';
  this.temp = '<embed src="' + 'target2.pdf' + '"  width="800px" height="700px" type="application/pdf"></iframe>';  
  this.renderer.setProperty(this.divViewer.nativeElement,'innerHTML', this.temp);               
 } */
  getPDFFileFromService() {
    this.webClientService.getPDFViewerEndpoint().subscribe(
      (response) => {
        this.data = response;  

        //const rt = JSON.parse(this.data);
        console.log("Mesage------->", response["value"]);   
        this.data = response["value"];     

//        this.temp = '<iframe src="' + this.data + '"  width="600px" height="600px" type="application/pdf"></iframe>';

        if (this.isStandaloine)
        {
          this.openNewWindowWithUrl(this.data);
          return;
        }
        else if (this.isBigPDF)
        {
          this.temp = '<embed src="' + 'https://localhost:44309/pdfjs-dist/web/demo-big.pdf' + '#toolbar=0&navpanes=0&scrollbar=0' + '"  width="800px" height="700px" type="application/pdf"></embed>';          
        }
        else if (this.isEmbedded)
          this.temp = '<embed src="' + this.data + '#toolbar=0&navpanes=0&scrollbar=0' + '"  width="800px" height="700px" type="application/pdf"></embed>';
        else
          this.temp = '<iFrame id="pdfIframe" src="' + this.data  + '#view=fit" height="100%" width="100%"  ></iFrame>';        

       this.renderer.setProperty(this.divPDF.nativeElement,'innerHTML', this.temp);               
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }   

  openNewWindowWithUrl(url: string): void {
    const newWindow = this.renderer.createElement('a');
    this.renderer.setAttribute(newWindow, 'href', url);
    this.renderer.setAttribute(newWindow, 'target', '_blank');
    newWindow.click();
  }

  // Example usage
  openNewWindow(): void {
    const url = 'https://www.example.com'; // Replace with your desired URL
    this.openNewWindowWithUrl(url);
  }

     getDataFromService() {
    this.webClientService.getData().subscribe(
      (response) => {
        this.data = response;        
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }   

  loadPDF() {
    this.webClientService.getPDFFile().subscribe(
      (pdfBlob: Blob) => {
        this.filename = "targetModified.pdf";
        saveAs(pdfBlob, this.filename);
        this.data = this.sanitizer.bypassSecurityTrustResourceUrl(this.filename);

        //this.data = this.createSafeUrl(pdfBlob);
        //this.data = URL.createObjectURL(pdfBlob);        
      },
      (error) => {
        console.error('Failed to load PDF:', error);
      }
    );
  }

  createSafeUrl(blob: Blob): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }  



  

  



/*   getFileFromService() {
    this.webClientService.getFile().subscribe(
      (response: HttpResponse<Blob>) => {
        const blob = new Blob([response.body], { type: response.headers.get('Content-Type') });
        const url = window.URL.createObjectURL(blob);
        //const url = response.url;
        this.data = url;
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }  */  
}

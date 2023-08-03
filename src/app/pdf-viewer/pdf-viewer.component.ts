import { Component, OnInit } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';
// import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, version } from 'pdfjs-dist';



@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfSrc = 'https://localhost:44309/pdfjs-dist/web/target2.pdf'; // Replace with the actual URL or path of your PDF file

  ngOnInit(): void {
    pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
    this.loadPdf(this.pdfSrc);
  }

  loadPdf(url: string): void {
    const loadingTask = pdfjs.getDocument(url);
    loadingTask.promise.then((pdf) => {
      pdf.getPage(1).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // const canvas = document.getElementById('pdfCanvas') as HTMLCanvasElement;
        const canvas = document.createElement('pdfCanvas') as HTMLCanvasElement;

        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // const renderContext = {
        //   canvasContext: context,
        //   viewport
        // };

//        page.render(renderContext);

const renderContext = {
  canvasContext: context as CanvasRenderingContext2D,
  viewport: viewport
};

page.render(renderContext);
if (pdf != null) pdf.destroy();


      });
    }).catch((error) => {
      console.error('Error loading PDF:', error);
    });
  }
}

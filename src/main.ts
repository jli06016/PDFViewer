import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as pdfjs from 'pdfjs-dist';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

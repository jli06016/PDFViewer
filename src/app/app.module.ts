import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { WebClientService } from './web-client.service';

import { HttpClientModule } from  '@angular/common/http';

import * as pdfjs from 'pdfjs-dist';

import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { KendoComponent } from './kendo/kendo.component';

// Import the Kendo UI module you want to use
import { ButtonsModule } from '@progress/kendo-angular-buttons'; // Example with Buttons module

@NgModule({
  declarations: [
    AppComponent,
    PdfViewerComponent,
    KendoComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    HttpClientModule  //imported the module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



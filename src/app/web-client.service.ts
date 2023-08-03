import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse, HttpHeaders   } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebClientService {
  constructor(private http: HttpClient) { }

  getPDFViewerEndpoint(): Observable<any> {
    return this.http.get<any>('https://localhost:44309/api/pdf'); // Replace with your API endpoint
  }

  getData(): Observable<any> {
    return this.http.get<any>('https://localhost:44309/api/pdf/1'); // Replace with your API endpoint
  }

  getFile(): Observable<HttpResponse<Blob>> {
    return this.http.get('https://localhost:44309/api/pdf/getpdf', { responseType: 'blob', observe: 'response' });
  }  

  getPDFData(): Observable<any> {
    return this.http.get<any>('https://localhost:44309/api/pdf/getpdf'); // Replace with your API endpoint
  }

    getPDFFile(): Observable<Blob> {
      const headers = new HttpHeaders().set('Accept', 'application/pdf');
      return this.http.get('https://localhost:44309/api/pdf', { responseType: 'blob', headers });
    }   
/*   this.http.get('https://localhost:44309/api/pdf/getpdf', { responseType: 'blob' })
  .subscribe((response: HttpResponse<Blob>) => {
    const blob = new Blob([response.body], { type: response.headers.get('Content-Type') });
    const url = window.URL.createObjectURL(blob);
    return url;
    // Use the URL to display or download the file
  }); */

}



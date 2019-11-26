import { Injectable } from '@angular/core';
import {HttpClient ,HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import {  ResponseContentType } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }
  
  // file from event.target.files[0]
  uploadFile(url: string, file: File): Observable<HttpEvent<any>> {
      debugger;
 url=`${environment.BACKEND_URL}/upload`;
 console.log('Url',url)
    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, file);
    return this.http.request(req);
  }

  getImage(imageUrl: string): Observable<Blob> {
    var url=`${environment.BACKEND_URL}/getImage`;
    return this.http.get(imageUrl, { responseType: 'blob' }
    );
  }

  getImage2(): Observable<any> {
    var imageUrl=`${environment.BACKEND_URL}/getImages`;
    return this.http.get(imageUrl);
  }
//   public saveProjectData( file: File ) {
//       console.log('Save Project called');
//     const formdata: FormData = new FormData();
//     formdata.append( 'file', file, file.name );

//     return this.http.post( `${environment.BACKEND_URL}/upload`, formdata )
//    // .map( response => response.json() );
// }
}
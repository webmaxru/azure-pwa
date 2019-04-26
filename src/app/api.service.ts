import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private snackBarDuration: number = 2000;

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {}

  callApi(
    url: string,
    method: string = 'GET',
    body: any = {},
    headers: any = new HttpHeaders()
  ): Observable<any> {
    this.log('callApi: ' + url);

    switch (method) {
      case 'GET': {
        return this.httpClient
          .get(url, { headers })
          .pipe(catchError(this.handleError<any>(url)));
      }
      case 'POST': {
        return this.httpClient
          .post(url, body, { headers })
          .pipe(catchError(this.handleError<any>(url)));
      }
      case 'PUT': {
        return this.httpClient
          .put(url, body, { headers })
          .pipe(catchError(this.handleError<any>(url)));
      }
      case 'DELETE': {
        return this.httpClient
          .delete(url, { headers })
          .pipe(catchError(this.handleError<any>(url)));
      }
      default: {
        this.log('Method not implemented');
        return;
      }
    }
  }

  private handleError<T>(url = null, result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${url} failed: ${error.message}`);

      let snackBarRef = this.snackBar.open(error.message || error, null, {
        duration: this.snackBarDuration
      });

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('[Api Service]: ' + message);
  }
}

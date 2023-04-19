import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ITypeProbleme } from './type';
import { catchError, tap } from 'rxjs/operators';


export class TypeService {
private URLDonnees = 'api/typesprobleme';
  constructor(private http: HttpClient) { }
  obtenirProbleme(): Observable<ITypeProbleme[]> {
    return this.http.get<ITypeProbleme[]>(this.baseUrl).pipe(
      tap(data => console.log('obtenirProbleme: ' + JSON.stringify(data))),
      catchError(this.handleError)
  );
}
private baseUrl = 'api/typesprobleme';
private handleError(err: HttpErrorResponse) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}
}
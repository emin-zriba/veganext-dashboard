import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WazuhApiService {
  private apiUrl = 'http://0.0.0.0:8000'; 

  constructor(private http: HttpClient) {}

  getMachines(limit: number = 100, offset: number = 0): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(`${this.apiUrl}/machines`, { headers, params }).pipe(
      catchError(error => {
        console.error('Error fetching machines:', error);
        return throwError(error);
      })
    );
  }

  getAlerts(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/alerts`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching alerts:', error);
        return throwError(error);
      })
    );
  }
  
  getIncidents(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/incidents`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching incidents:', error);
        return throwError(error);
      })
    );
  }
}
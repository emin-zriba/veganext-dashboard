import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WazuhApiService {
  private apiUrl = 'https://45.56.79.95:55000'; // Hardcoded API URL
  private authUrl = `${this.apiUrl}/security/user/authenticate?raw=true`; // Authentication endpoint
  private username = 'wazuh-wui';
  private password = 'PYNLrvq0NKqYOILtGg?XhYwMKmUPrN4+';
  private token: string | null = null; // Store token once obtained

  constructor(private http: HttpClient) {}



  private authenticate(): Observable<string> {
    const authHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers' : '*',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`),
    });

    return this.http.post<{ token: string }>(this.authUrl, {}, { headers: authHeaders }).pipe(
      map(response => response.token),
      map(token => {
        this.token = token;
        return token;
      }),
      catchError(error => {
        console.error('Authentication error:', error);
        return throwError(error);
      })
    );
  }

  // Helper method to include token in headers
  private getWithAuth(url: string, params: HttpParams): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get(url, { headers, params }).pipe(
      catchError(error => {
        console.error('Request error:', error);
        return throwError(error);
      })
    );
  }



  // Fetch live agents (active status)
  getLiveAgents(): Observable<any> {
    const params = new HttpParams().set('status', 'active');
    return this.authenticate().pipe(
      switchMap(() => this.getWithAuth(`${this.apiUrl}/agents`, params))
    );
  }

  // Fetch agents with pagination and sorting
  getAgents(limit: number = 100, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('sort', '-dateAdd');

    return this.authenticate().pipe(
      switchMap(() => this.getWithAuth(`${this.apiUrl}/agents`, params))
    );
  }

  // Fetch machines with pagination and sorting
  getmachines(limit: number = 100, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('sort', '-timestamp');

    return this.authenticate().pipe(
      switchMap(() => this.getWithAuth(`${this.apiUrl}/machines`, params))
    );
  }

  getAlerts(limit: number = 100, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('sort', '-timestamp');

    return this.authenticate().pipe(
      switchMap(() => this.getWithAuth(`${this.apiUrl}/alerts`, params))
    );
  }


  // Fetch incidents with filtering by rule level >= 10
  getIncidents(limit: number = 100, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('sort', '-timestamp')
      .set('q', 'rule.level>=10');

    return this.authenticate().pipe(
      switchMap(() => this.getWithAuth(`${this.apiUrl}/incidents`, params))
    );
  }
}
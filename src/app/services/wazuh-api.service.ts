import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WazuhApiService {
  private apiUrl = 'https://localhost:55000';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-token'
  });

  constructor(private http: HttpClient) { }

  getAlerts(limit: number = 100, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('sort', '-timestamp');  
    return this.http.get(`${this.apiUrl}/alerts`, { headers: this.headers, params });
  }

  getCriticalAlerts(limit: number = 100, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('sort', '-timestamp')
      .set('q', 'rule.level>=15');  
    
    return this.http.get(`${this.apiUrl}/alerts`, { headers: this.headers, params });
  }

  getLiveAgents(): Observable<any> {
    const params = new HttpParams().set('status', 'active');
    
    return this.http.get(`${this.apiUrl}/agents`, { headers: this.headers, params });
  }

  getIncidents(limit: number = 100, offset: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('sort', '-timestamp')
      .set('q', 'rule.level>=10'); 
    
    return this.http.get(`${this.apiUrl}/alerts`, { headers: this.headers, params });
  }
}
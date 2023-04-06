import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  getOpportunity(): Observable<any> {
    return this.http.get(`/api/deals?token=626a92080b9dd9000c709b97&page=1&limit=200`);
  }



}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoTableColumn } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<any> {
    return this.http.get(`/api/contacts?token=626a92080b9dd9000c709b97&page=1&limit=200`);
  }

  getFunnel(): Observable<any> {
    return this.http.get(`/api/deal_pipelines?token=626a92080b9dd9000c709b97`)
  }

  getSource(): Observable<any> {
    return this.http.get(`/api/deal_sources?token=626a92080b9dd9000c709b97`)
  }

  getOrganization(): Observable<any> {
    return this.http.get(`/api/organizations?token=626a92080b9dd9000c709b97`)
  }

  getCampaigns(): Observable<any> {
    return this.http.get(`/api/campaigns?token=626a92080b9dd9000c709b97`)
  }

}

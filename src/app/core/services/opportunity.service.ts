import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  constructor(private http: HttpClient) {}

  getContacts(): Observable<any> {
    const token = environment.token;
    const limit = 200;
    // Faz a primeira solicitação para obter as informações de metadados
    return this.http
      .get(`/api/contacts?token=${token}&limit=${limit}&metadata=true`)
      .pipe(
        mergeMap((response: any) => {
          console.log(response);
          const totalCount = response.total;
          const totalPages = Math.ceil(totalCount / 200);

          const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
          const observables = pages.map((page) =>
            this.http.get(
              `/api/contacts?token=${token}&limit=${limit}&page=${page}`
            )
          );

          return forkJoin(observables);
        })
      );
  }

  getFunnel(): Observable<any> {
    return this.http.get(`/api/deal_pipelines?token=${environment.token}`);
  }

  getSource(): Observable<any> {
    return this.http.get(`/api/deal_sources?token=${environment.token}`);
  }

  getOrganizations(): Observable<any> {
    const token = environment.token;
    const limit = 200;

    // Faz a primeira solicitação para obter as informações de metadados
    return this.http
      .get(`/api/organizations?token=${token}&limit=${limit}&metadata=true`)
      .pipe(
        mergeMap((response: any) => {
          console.log(response);
          const totalCount = response.total;
          const totalPages = Math.ceil(totalCount / 200);

          const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
          const observables = pages.map((page) =>
            this.http.get(
              `/api/organizations?token=${token}&limit=${limit}&page=${page}`
            )
          );

          return forkJoin(observables);
        })
      );
  }

  getCampaigns(): Observable<any> {
    return this.http.get(`/api/campaigns?token=${environment.token}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`/api/users?token=${environment.token}`);
  }

  createOpportunity(payload: any): Observable<any> {
    return this.http.post(`/api/deals?token=${environment.token}`, payload);
  }
}

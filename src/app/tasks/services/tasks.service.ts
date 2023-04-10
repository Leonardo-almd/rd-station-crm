import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  getOpportunity(): Observable<any> {
    const token = environment.token;
    const limit = 200;
    // Faz a primeira solicitação para obter as informações de metadados
    return this.http
      .get(`/api/deals?token=${token}&limit=${limit}&metadata=true`)
      .pipe(
        mergeMap((response: any) => {
          console.log(response);
          const totalCount = response.total;
          const totalPages = Math.ceil(totalCount / 200);

          const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
          const observables = pages.map((page) =>
            this.http.get(
              `/api/deals?token=${token}&limit=${limit}&page=${page}`
            )
          );

          return forkJoin(observables);
        })
      );
  }

  createTask(payload: any) {
    return this.http.post(`/api/tasks?token=${environment.token}`, payload);
  }
}

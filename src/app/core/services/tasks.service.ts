import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getOpportunity(): Observable<any> {
    // return this.http.get('api/firebase/opportunities')
    const token = environment.token;
    const limit = 200;

    const hoje = new Date();
    const diasASubtrair = 7;
    const dataUmaSemanaAtras = new Date(
      hoje.getTime() - diasASubtrair * 24 * 60 * 60 * 1000
    );

    const ano = dataUmaSemanaAtras.getFullYear();
    const mes = (dataUmaSemanaAtras.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataUmaSemanaAtras.getDate().toString().padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia}`;

    return this.http
      .get(`/api/deals?token=${token}&limit=${limit}&created_at_period=${true}&start_date=${dataFormatada}&metadata=true`)
      .pipe(
        mergeMap((response: any) => {
          const totalCount = response.total;
          const totalPages = Math.ceil(totalCount / 200);

          const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
          const observables = pages.map((page) =>
            this.http.get(
              `/api/deals?token=${token}&limit=${limit}&created_at_period=${true}&start_date=${dataFormatada}&page=${page}`
            )
          );

          return forkJoin(observables);
        })
      );
  }

  createTask(payload: any): Observable<any> {
    return this.http.post(`/api/tasks?token=${environment.token}`, payload);
  }

  getUsers(): Observable<any> {
    return this.http.get(`/api/users?token=${environment.token}`);
  }
}

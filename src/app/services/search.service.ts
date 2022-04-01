import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { URL_CONFIG } from "../configs/configs";
import { ResultModel } from "../components/results/result.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor (private http: HttpClient) {
  }

  search (query: string) {
    return this.http.get(URL_CONFIG.searchUrl + query).pipe(map((res: any) => {
      return SearchService.transformOutput(res);
    }), catchError(this.handleError())) as Observable<ResultModel[]>
  }

  private static transformOutput ({items}: any) {
    if (!items) {
      return [];
    }
    const list: Array<ResultModel> = [];
    for (let i = 0; i < items.length; i++) {
      list.push({
        avatar_url: items[i].avatar_url,
        login: items[i].login,
        type: items[i].type
      })
    }
    return list;
  }

  private handleError<T> () {
    console.log('in error handler');
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      if (error.error instanceof Event) {
        throw error.error;
      }
      const message = `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`get users failed: ${message}`);
    };
  }
}

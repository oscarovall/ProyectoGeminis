import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  public getData(url: string) {
    const URL: string = url;

    return this.http.get(URL);
  }

  public handleError(error: any) {
    return observableThrowError(error.error || 'Server Error');
  }
}

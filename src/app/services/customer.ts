import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  constructor(private  http : HttpClient) {
  }

  public getCustomers() : Observable<any> {
    return this.http.get('http://127.0.0.1:8085/customer');
  }
}

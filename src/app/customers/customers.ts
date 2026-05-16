import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { async, catchError, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-customers',
  imports: [
    AsyncPipe,
    NgTemplateOutlet
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers! : Observable<Array<Customer>>;
  errorMessage! : object ;
  constructor(private customerService : CustomerService) {

  }
  ngOnInit() {
    this.customers= this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-customers',
  imports: [
    JsonPipe,
    AsyncPipe
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
    this.customers= this.customerService.getCustomers();
  }

}

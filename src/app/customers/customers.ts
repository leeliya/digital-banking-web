import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer';
import { AsyncPipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { async, catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers! : Observable<Array<Customer>>;
  errorMessage! : object ;
  searchFormGroup!: FormGroup;

  constructor(private customerService : CustomerService, private fb:FormBuilder) {}

  ngOnInit() {
    this.searchFormGroup= this.fb.group({
      keyword : this.fb.control('', [Validators.required]),
    })
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
    this.customers= this.customerService.searchCustomers(keyword).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(customer: Customer) {
      if(confirm("Are you sure you want to delete this customer?")) {
        this.customerService.deleteCustomer(customer.id).subscribe({
          next: result => {
            this.customers= this.customers.pipe(
              map(data => {
                let index = data.indexOf(customer);
                data.slice(index,1);
                return data;
              }),
            )
          },
          error: err => {
            alert(err.message);
          }
      });
      }

  }
}

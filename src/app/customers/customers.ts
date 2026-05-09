import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  customers : any;
  constructor(private http : HttpClient) {

  }
  ngOnInit() {
    this.http.get('http://127.0.0.1:8085/customers').subscribe({
      next  :(data) => this.customers = data,
      error : (err)  => console.log(err)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css',
})
export class NewCustomer implements  OnInit {
    newCustomerFormGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private router:Router) { }

    ngOnInit(): void {
        this.newCustomerFormGroup=this.formBuilder.group({
          name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
          email: this.formBuilder.control('', [Validators.required, Validators.email]),
        });
    }

  handleSaveCustomer() {
    let customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: (data:any) => {
        alert("Customer saved successfully");
        // this.newCustomerFormGroup.reset();
        this.router.navigate(['/customers']);
      },
      error: (err:any) => {
        alert(err.message);
      }
    })

  }
}

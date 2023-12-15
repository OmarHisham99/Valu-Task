import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Department } from '../../common';

@Component({
  selector: 'app-register-employee-dialog',
  templateUrl: './register-employee-dialog.component.html',
  styleUrl: './register-employee-dialog.component.scss',
})
export class RegisterEmployeeDialogComponent {
  // ***************** Variables ***************** //
  isVisible: boolean = false;
  departments: any[] = [{ id: 1, name: 'IT' }];
  validateForm: FormGroup<{
    name: FormControl<string>;
    employeeIdentification: FormControl<string>;
    employeeMobile: FormControl<string>;
    employeePhone: FormControl<string>;
    active: FormControl<boolean>;
    hireDate: FormControl<Date>;
    department: FormControl<string>;
    position: FormControl<string>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    employeeIdentification: ['', [Validators.required]],
    employeeMobile: ['', [Validators.required]],
    employeePhone: [''],
    active: [true, [Validators.required]],
    hireDate: [new Date(), [Validators.required]],
    department: ['', [Validators.required]],
    position: ['', [Validators.required]],
  });

  // ***************** Constructor ***************** //
  constructor(private fb: NonNullableFormBuilder) {}
  // ***************** Functions ***************** //
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
}

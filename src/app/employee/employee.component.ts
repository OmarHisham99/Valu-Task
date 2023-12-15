import { Component, ViewChild, OnInit } from '@angular/core';
import { Employee } from '../common';
import { RegisterEmployeeDialogComponent } from '../components/register-employee-dialog/register-employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  // ***************** Variables ***************** //
  employees: Employee[] = [];
  @ViewChild(RegisterEmployeeDialogComponent)
  registerEmployeeDialog!: RegisterEmployeeDialogComponent;
  // ***************** Constructor ***************** //
  constructor() {}

  ngOnInit(): void {}
  // ***************** Functions ***************** //
  showRegisterEmployeeDialog(): void {
    this.registerEmployeeDialog.showModal();
  }
}

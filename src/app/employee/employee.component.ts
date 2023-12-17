import { Component, ViewChild, OnInit,ChangeDetectorRef } from '@angular/core';
import { Employee } from '../common';
import { RegisterEmployeeDialogComponent } from '../components/register-employee-dialog/register-employee-dialog.component';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  // ***************** Variables ***************** //
  createEmployee?: boolean; 
  @ViewChild(RegisterEmployeeDialogComponent)
  registerEmployeeDialog!: RegisterEmployeeDialogComponent;
  // ***************** Constructor ***************** //
  constructor(public employeeService: EmployeeService, public cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employeeService.employees = employees;
    });
  }
  // ***************** Functions ***************** //
  showRegisterEmployeeDialog(): void {
    this.registerEmployeeDialog.showModal();
  }
  handleDelete(id?: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employeeService.employees = this.employeeService.employees!.filter((e) => e.id !== id);
    });
  }
  handleEdit(id?: number): void {
    this.employeeService.getEmployee(id!).subscribe((employee) => {
      this.registerEmployeeDialog.showModalForEdit(employee);
    });
  }
}

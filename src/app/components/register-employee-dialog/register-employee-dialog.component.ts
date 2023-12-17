import { Component, ChangeDetectorRef, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Department, Employee } from '../../common';
import { EmployeeService } from '../../employee/employee.service';
import { DepartmentService } from '../../department/department.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-employee-dialog',
  templateUrl: './register-employee-dialog.component.html',
  styleUrl: './register-employee-dialog.component.scss',
})
export class RegisterEmployeeDialogComponent {
  // ***************** Variables ***************** //
  title: string = this.translateService.instant('Register Employee');
  @Input() createEmployee?: boolean;
  employee?: Employee;
  isVisible: boolean = false;
  validateForm: FormGroup<{
    name: FormControl<string>;
    employeeIdentification: FormControl<string>;
    employeeMobile: FormControl<string>;
    employeePhone: FormControl<string>;
    active: FormControl<boolean>;
    hireDate: FormControl<Date>;
    departId: FormControl<string>;
    position: FormControl<string>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    employeeIdentification: ['', [Validators.required]],
    employeeMobile: [
      '',
      [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^(010|011|012|015)\\d{8}$'),
      ],
    ],
    employeePhone: [''],
    active: [true, [Validators.required]],
    hireDate: [new Date(), [Validators.required]],
    departId: ['', [Validators.required]],
    position: ['', [Validators.required]],
  });

  // ***************** Constructor ***************** //
  constructor(
    private fb: NonNullableFormBuilder,
    public employeeService: EmployeeService,
    public cdr: ChangeDetectorRef,
    public departmentService: DepartmentService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departmentService.departments = departments;
    });
  }
  // ***************** Functions ***************** //
  showModal(): void {
    this.isVisible = true;
  }
  showModalForEdit(employee: Employee): void {
    this.isVisible = true;
    this.employee = employee;
    this.validateForm.patchValue({
      name: employee.name,
      employeeIdentification: employee.employeeIdentification,
      employeeMobile: employee.employeeMobile,
      employeePhone: employee.employeePhone,
      active: employee.active,
      hireDate: employee.hireDate,
      departId: employee.departmentId.toString(),
      position: employee.position,
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.clearData();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      let depId = Number(this.validateForm.value.departId);
      let employee: Employee = {
        name: this.validateForm.value.name!,
        employeeIdentification: this.validateForm.value.employeeIdentification!,
        employeeMobile: this.validateForm.value.employeeMobile!,
        employeePhone: this.validateForm.value.employeePhone!,
        active: this.validateForm.value.active!,
        hireDate: this.validateForm.value.hireDate!,
        position: this.validateForm.value.position!,
        departmentId: depId,
      };
      if (this.createEmployee) {
        this.employeeService.addEmployee(employee).subscribe((res) => {
          this.employeeService.employees = [
            ...this.employeeService.employees!,
            res,
          ];
          this.isVisible = false;
          this.clearData();
        });
      } else if (!this.createEmployee) {
        this.employeeService
          .updateEmployee(this.employee?.id, employee)
          .subscribe((res) => {
            this.employeeService.employees?.forEach((emp) => {
              if (emp.id === res.id) {
                emp.name = res.name;
                emp.employeeIdentification = res.employeeIdentification;
                emp.employeeMobile = res.employeeMobile;
                emp.employeePhone = res.employeePhone;
                emp.active = res.active;
                emp.hireDate = res.hireDate;
                emp.position = res.position;
                emp.departmentId = res.departmentId;
              }
            });
            this.isVisible = false;
            this.clearData();
          });
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  clearData(): void {
    this.validateForm.reset();
  }
}

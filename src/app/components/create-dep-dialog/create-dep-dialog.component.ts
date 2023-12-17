import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { DepartmentService } from '../../department/department.service';
import { Department } from '../../common';
@Component({
  selector: 'app-create-dep-dialog',
  templateUrl: './create-dep-dialog.component.html',
  styleUrl: './create-dep-dialog.component.scss',
})
export class CreateDepDialogComponent {
  // ***************** Variables ***************** //
  @Input() createDepartment?: boolean;
  department?: Department;
  isVisible: boolean = false;
  validateForm: FormGroup<{
    name: FormControl<string>;
    details: FormControl<string>;
    order: FormControl<string>;
    active: FormControl<boolean>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    details: ['', [Validators.required]],
    order: ['', [Validators.required]],
    active: [true, [Validators.required]],
  });
  // ***************** Constructor ***************** //
  constructor(
    private fb: NonNullableFormBuilder,
    public departmentService: DepartmentService
  ) {}
  ngOnInit(): void {}

  // ***************** Functions ***************** //
  showModal(): void {
    this.isVisible = true;
  }
  showModalForEdit(department: Department): void {
    this.isVisible = true;
    this.department = department;
    this.validateForm.patchValue({
      name: department.name,
      details: department.details,
      order: department.order.toString(),
      active: department.active,
    });
    console.log(this.validateForm.value);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.clearData();
  }

  submitForm(): void {
    // if the form is valid then add the department or update it based on the createDepartment boolean
    if (this.validateForm.valid) {
      // Create a department object from the form values
      let dep: Department = {
        name: this.validateForm.value.name!,
        details: this.validateForm.value.details!,
        order: parseInt(this.validateForm.value.order!),
        active: this.validateForm.value.active!,
        employees: [],
      };
      // if the createDepartment boolean is true then add the department
      if (this.createDepartment) {
        this.departmentService.addDepartment(dep).subscribe((department) => {
          // add the department to the departments array
          this.departmentService.departments = [
            ...this.departmentService.departments!,
            department,
          ];
          this.isVisible = false;
          this.clearData();
        });
        // if the createDepartment boolean is false then update the department
      } else if (!this.createDepartment) {
        this.departmentService
          .updateDepartment(this.department?.id, dep)
          .subscribe((department) => {
            // update the department in the departments array
            this.departmentService.departments.forEach((dep) => {
              if (dep.id === department.id) {
                dep.name = department.name;
                dep.details = department.details;
                dep.order = department.order;
                dep.active = department.active;
              }
            });
            this.isVisible = false;
            this.clearData();
          });
      }
      // if the form is not valid then mark all the controls as dirty
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

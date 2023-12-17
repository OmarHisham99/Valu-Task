import { Component, ViewChild } from '@angular/core';
import { CreateDepDialogComponent } from '../components/create-dep-dialog/create-dep-dialog.component';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent {
  // ***************** Variables ***************** //
  createDepartment?: boolean;
  @ViewChild(CreateDepDialogComponent)
  createDepDialog!: CreateDepDialogComponent;
  // ***************** Constructor ***************** //
  constructor(public departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departmentService.departments = departments;
    });
  }
  // ***************** Functions ***************** //
  showCreateDepDialog(): void {
    this.createDepDialog.showModal();
    this.createDepartment = true;
  }
  handleDelete(id?: number): void {
    this.departmentService.deleteDepartment(id!).subscribe(() => {
      this.departmentService.departments =
        this.departmentService.departments!.filter((e) => e.id !== id);
    });
  }
  handleEdit(id?: number): void {
    this.departmentService.getDepartment(id!).subscribe((department) => {
      this.createDepartment = false;
      this.createDepDialog.showModalForEdit(department);
    });
  }
}

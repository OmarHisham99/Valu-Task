import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Department, Employee } from '../common';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  // ***************** Variables ***************** //
  private apiUrl = 'http://localhost:3000/departments';
  departments: Department[] = [];
  // ***************** Constructor ***************** //
  constructor(private http: HttpClient) {}

  // ***************** Functions ***************** //
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartment(id: number): Observable<Department> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Department>(url);
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(depId?:number,department?: Department): Observable<Department> {
    const url = `${this.apiUrl}/${depId}`;
    return this.http.put<Department>(url, department);
  }

  deleteDepartment(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  addEmployeeToDepartment(id: number, employee: any): Observable<Department> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Department>(url).pipe(
      switchMap((department) => {
        const updatedDepartment: Department = {
          ...department,
          employees: [...department.employees!, employee],
        };

        return this.http.put<Department>(url, updatedDepartment);
      })
    );
  }
}

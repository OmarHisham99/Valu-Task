import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // ***************** Variables ***************** //
  private apiUrl = 'http://localhost:3000/Employees';
  employees: Employee[] = [];
  // ***************** Constructor ***************** //
  constructor(private http: HttpClient) {}

  // ***************** Functions ***************** //
  getEmployees(): Observable<Employee[]> {
     return this.http.get<Employee[]>(this.apiUrl)
    }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(empId?:number,employee?: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${empId}`;
    return this.http.put<Employee>(url, employee);
  }

  deleteEmployee(id?: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

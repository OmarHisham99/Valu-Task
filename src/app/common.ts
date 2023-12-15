export interface Employee {
  id?: number;
  name: string;
  departmentId: number;
  departmentName: string;
  employeeIdentification: string;
  employeePhone?: string;
  employeeMobile: string;
  active: boolean;
  hireDate: Date;
  position: string;
}

// department.model.ts
export interface Department {
  id?: number;
  name: string;
  details: string;
  Order: number;
  active: boolean;
  employees?: Employee[];
}

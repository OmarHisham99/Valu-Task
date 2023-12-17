export interface Employee {
  id?: number | undefined;
  name: string;
  departmentId: number;
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
  order: number;
  active: boolean;
  employees?: Employee[];
}

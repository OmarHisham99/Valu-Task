import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsSectionComponent } from './departments-section.component';

describe('DepartmentsSectionComponent', () => {
  let component: DepartmentsSectionComponent;
  let fixture: ComponentFixture<DepartmentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepDialogComponent } from './create-dep-dialog.component';

describe('CreateDepDialogComponent', () => {
  let component: CreateDepDialogComponent;
  let fixture: ComponentFixture<CreateDepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDepDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

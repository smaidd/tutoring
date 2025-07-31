import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSheetComponent } from './student-sheet.component';

describe('StudentSheetComponent', () => {
  let component: StudentSheetComponent;
  let fixture: ComponentFixture<StudentSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSheetComponent } from './teacher-sheet.component';

describe('TeacherSheetComponent', () => {
  let component: TeacherSheetComponent;
  let fixture: ComponentFixture<TeacherSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

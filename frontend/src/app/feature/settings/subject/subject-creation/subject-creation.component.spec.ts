import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCreationComponent } from './subject-creation.component';

describe('SubjectCreationComponent', () => {
  let component: SubjectCreationComponent;
  let fixture: ComponentFixture<SubjectCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

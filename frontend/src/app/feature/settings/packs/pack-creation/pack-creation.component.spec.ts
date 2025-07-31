import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackCreationComponent } from './pack-creation.component';

describe('PackCreationComponent', () => {
  let component: PackCreationComponent;
  let fixture: ComponentFixture<PackCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

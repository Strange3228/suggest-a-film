import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPlaceholderComponent } from './results-placeholder.component';

describe('ResultsPlaceholderComponent', () => {
  let component: ResultsPlaceholderComponent;
  let fixture: ComponentFixture<ResultsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

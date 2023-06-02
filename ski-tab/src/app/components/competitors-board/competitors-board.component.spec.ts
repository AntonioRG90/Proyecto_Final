import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorsBoardComponent } from './competitors-board.component';

describe('CompetitorsBoardComponent', () => {
  let component: CompetitorsBoardComponent;
  let fixture: ComponentFixture<CompetitorsBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetitorsBoardComponent]
    });
    fixture = TestBed.createComponent(CompetitorsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

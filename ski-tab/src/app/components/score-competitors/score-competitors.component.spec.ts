import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCompetitorsComponent } from './score-competitors.component';

describe('ScoreCompetitorsComponent', () => {
  let component: ScoreCompetitorsComponent;
  let fixture: ComponentFixture<ScoreCompetitorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreCompetitorsComponent]
    });
    fixture = TestBed.createComponent(ScoreCompetitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

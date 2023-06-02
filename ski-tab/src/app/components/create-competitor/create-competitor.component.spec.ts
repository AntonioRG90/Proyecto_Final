import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompetitorComponent } from './create-competitor.component';

describe('CreateCompetitorComponent', () => {
  let component: CreateCompetitorComponent;
  let fixture: ComponentFixture<CreateCompetitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompetitorComponent]
    });
    fixture = TestBed.createComponent(CreateCompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

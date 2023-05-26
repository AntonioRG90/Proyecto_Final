import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCompetitionsComponent } from './settings-competitions.component';

describe('SettingsCompetitionsComponent', () => {
  let component: SettingsCompetitionsComponent;
  let fixture: ComponentFixture<SettingsCompetitionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsCompetitionsComponent]
    });
    fixture = TestBed.createComponent(SettingsCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

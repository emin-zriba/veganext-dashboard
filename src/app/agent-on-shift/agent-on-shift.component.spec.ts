import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOnShiftComponent } from './agent-on-shift.component';

describe('AgentOnShiftComponent', () => {
  let component: AgentOnShiftComponent;
  let fixture: ComponentFixture<AgentOnShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentOnShiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentOnShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

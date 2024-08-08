import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineMachinesListComponent } from './online-machines-list.component';

describe('OnlineMachinesListComponent', () => {
  let component: OnlineMachinesListComponent;
  let fixture: ComponentFixture<OnlineMachinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineMachinesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineMachinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

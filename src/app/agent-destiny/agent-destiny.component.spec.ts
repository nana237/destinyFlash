import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDestinyComponent } from './agent-destiny.component';

describe('AgentDestinyComponent', () => {
  let component: AgentDestinyComponent;
  let fixture: ComponentFixture<AgentDestinyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDestinyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDestinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

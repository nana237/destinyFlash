import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointDeRetraitComponent } from './point-de-retrait.component';

describe('PointDeRetraitComponent', () => {
  let component: PointDeRetraitComponent;
  let fixture: ComponentFixture<PointDeRetraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointDeRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointDeRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPAComponent } from './detail-p-a.component';

describe('DetailPAComponent', () => {
  let component: DetailPAComponent;
  let fixture: ComponentFixture<DetailPAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

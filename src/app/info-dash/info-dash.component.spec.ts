import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDashComponent } from './info-dash.component';

describe('InfoDashComponent', () => {
  let component: InfoDashComponent;
  let fixture: ComponentFixture<InfoDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglTut2Component } from './webgl-tut2.component';

describe('WebglTut2Component', () => {
  let component: WebglTut2Component;
  let fixture: ComponentFixture<WebglTut2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebglTut2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglTut2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

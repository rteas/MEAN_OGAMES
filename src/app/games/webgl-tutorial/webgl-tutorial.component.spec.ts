import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglTutorialComponent } from './webgl-tutorial.component';

describe('WebglTutorialComponent', () => {
  let component: WebglTutorialComponent;
  let fixture: ComponentFixture<WebglTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebglTutorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

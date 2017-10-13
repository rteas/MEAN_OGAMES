import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialGameComponent } from './tutorial-game.component';

describe('TutorialGameComponent', () => {
  let component: TutorialGameComponent;
  let fixture: ComponentFixture<TutorialGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

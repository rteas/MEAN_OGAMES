import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PongGameComponent } from './pong-game.component';

describe('PongGameComponent', () => {
  let component: PongGameComponent;
  let fixture: ComponentFixture<PongGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PongGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PongGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaserStatesComponent } from './phaser-states.component';

describe('PhaserStatesComponent', () => {
  let component: PhaserStatesComponent;
  let fixture: ComponentFixture<PhaserStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaserStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaserStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

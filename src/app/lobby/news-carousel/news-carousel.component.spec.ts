import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCarouselComponent } from './news-carousel.component';

describe('NewsCarouselComponent', () => {
  let component: NewsCarouselComponent;
  let fixture: ComponentFixture<NewsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

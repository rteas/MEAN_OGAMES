import { TestBed, inject } from '@angular/core/testing';

import { PongCanvasService } from './pong-canvas.service';

describe('PongCanvasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PongCanvasService]
    });
  });

  it('should be created', inject([PongCanvasService], (service: PongCanvasService) => {
    expect(service).toBeTruthy();
  }));
});

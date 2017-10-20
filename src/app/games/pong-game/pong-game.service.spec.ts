import { TestBed, inject } from '@angular/core/testing';

import { PongGameService } from './pong-game.service';

describe('PongGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PongGameService]
    });
  });

  it('should be created', inject([PongGameService], (service: PongGameService) => {
    expect(service).toBeTruthy();
  }));
});

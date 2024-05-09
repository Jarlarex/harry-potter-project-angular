import { TestBed } from '@angular/core/testing';
import { HarryPotterApiService } from './harry-potter-api.service';

describe('HarryPotterApiService', () => {
  let service: HarryPotterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarryPotterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

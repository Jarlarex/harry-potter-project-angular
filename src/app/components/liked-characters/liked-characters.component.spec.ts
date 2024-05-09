import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedCharactersComponent } from './liked-characters.component';

describe('LikedCharactersComponent', () => {
  let component: LikedCharactersComponent;
  let fixture: ComponentFixture<LikedCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedCharactersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikedCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

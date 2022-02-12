import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';

describe('CharacterDetailService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter character array', () => {
    const targetArr = [
      {
        name: 'YD',
        hair: 'black',
        gender: 'male',
        race: 'asian'
      },
      {
        name: 'DD',
        hair: 'brown',
        gender: 'female',
      },
      {
        name: 'CD',
        hair: 'brown',
        gender: 'male',
      },
    ];

    const filterParams = { name: '', hair: '', gender: '' };

    expect(service.nestedFilter(targetArr, filterParams)).toBe(3);
  });
});

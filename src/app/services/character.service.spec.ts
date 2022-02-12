import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { HttpClient } from '@angular/common/http';
import { AuthorizationHelperService } from '../utils/authorization/authorization-helper.service';

fdescribe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', ['get']),
        },
        AuthorizationHelperService,
      ],
    });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter characters by filter parameters correctly', () => {
    service.characterDetails = [
      {
        name: 'name1',
        gender: 'gender1',
        race: 'race1',
      },
      {
        name: 'name2',
        gender: 'gender1',
        race: 'race2',
      },
      {
        name: 'name3',
        gender: 'gender2',
        race: 'race1',
      },
      {
        name: 'name1',
        gender: 'gender2',
        race: 'race2',
      },
    ] as any;

    const filterParams1 = { name: '', gender: '', race: '' };
    const filterParams2 = { name: 'name2', gender: '', race: '' };
    const filterParams3 = { name: '', gender: 'gender2', race: '' };
    const filterParams4 = { name: '', gender: 'gender2', race: 'race1' };

    expect(service.filterCharacterDetails(filterParams1).length).toBe(4);
    expect(service.filterCharacterDetails(filterParams2).length).toBe(1);
    expect(service.filterCharacterDetails(filterParams3).length).toBe(2);
    expect(service.filterCharacterDetails(filterParams4).length).toBe(1);
  });
});

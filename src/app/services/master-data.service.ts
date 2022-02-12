import { Injectable } from '@angular/core';
import { Character } from '../character-detail/character';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {
  nameList: string[] = [];
  hairColorList: string[] = [];
  genderList: string[] = [];
  raceList: string[] = [];

  prepareMasterData(characterDetails: Character[]) {
    characterDetails.forEach((character) => {
      this.cachePut(this.nameList, character.name);
      this.cachePut(this.hairColorList, character.hair);
      this.cachePut(this.genderList, character.gender);
      this.cachePut(this.raceList, character.race);
    });
  }

  private cachePut(cacheList: string[], value: string) {
    if (value == undefined || value === '' || cacheList.indexOf(value) >= 0) {
      return;
    }

    cacheList.push(value);
  }
}

interface DropDownItem {
  label: string;
  value: string;
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationHelperService } from '../utils/authorization/authorization-helper.service';
import { MasterDataService } from './master-data.service';
import { Character } from '../character-detail/character';
import { lastValueFrom } from 'rxjs';
import { CommonHelper } from '../utils/common-helper';
import { ApplicationConstants } from '../utils/application-constants';
import { ApiCharacter } from './api-character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  characterDetails: Character[] = [];
  parsedCharacterDetails: ApiCharacter[] = [];

  constructor(
    private http: HttpClient,
    private authorizationHelperService: AuthorizationHelperService,
    private masterDataService: MasterDataService
  ) {}

  async getAllCharacters(): Promise<Character[]> {
    await this.loadAllCharacters();

    return this.characterDetails;
  }

  async getFilteredCharacters(filterParams: {}): Promise<Character[]> {
    await this.loadAllCharacters();

    let filteredArr = CommonHelper.filterObjectArray(
      this.characterDetails,
      filterParams
    );

    return filteredArr;
  }

  async loadAllCharacters() {
    if (this.characterDetails.length > 0) {
      return;
    }

    await this.loadFromServer();
  }

  private async loadFromServer() {
    const characterDetails = this.http.get(
      `${ApplicationConstants.BASE_URL}/character`,
      {
        headers: new HttpHeaders({
          authorization: this.authorizationHelperService.getToken(),
        }),
      }
    );

    const serverData: any = await lastValueFrom(characterDetails);
    this.characterDetails = serverData.docs;

    this.loadMasterData();
  }

  parseAPIData(apiData: ApiCharacter[]) {
    apiData.forEach((data) => {
      if (data.gender === 'Males' || data.gender === 'male') {
        data.gender = 'Male';
      }

      this.parsedCharacterDetails.push(data);
    });
  }

  loadMasterData() {
    this.masterDataService.prepareMasterData(this.characterDetails);
  }
}

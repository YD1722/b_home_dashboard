import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationHelperService } from '../utils/authorization/authorization-helper.service';
import { MasterDataService } from './master-data.service';
import { Character } from '../character-detail/character';
import { lastValueFrom, Observable } from 'rxjs';
import { CommonHelper } from '../utils/common-helper';
import { ApplicationConstants } from '../utils/application-constants';
import { map } from 'rxjs/operators';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  characterDetails: Character[] = [];

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
    return this.filterCharacterDetails(filterParams);
  }

  filterCharacterDetails(filterParams: {}) {
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

  parseAPIData(apiData: Character[]) {
    apiData.forEach((data: Character) => {
      const character = new Character();

      character.parseAPIData(data);
      this.characterDetails.push(character);
    });
  }

  loadMasterData() {
    this.masterDataService.prepareMasterData(this.characterDetails);
  }

  private async loadFromServer() {
    try {
      const characters = this.getCharacters();
      const serverData: Character[] = await lastValueFrom(characters);

      this.parseAPIData(serverData);
      this.loadMasterData();
    } catch (e) {
      // TODO: Implement logger
      console.log('Error in loading data from server');
    }
  }

  private getCharacters(): Observable<Character[]> {
    return this.http
      .get<ApiResponse>(`${ApplicationConstants.BASE_URL}/character`, {
        headers: new HttpHeaders({
          authorization: this.authorizationHelperService.getToken(),
        }),
      })
      .pipe(map((response: ApiResponse) => response.docs));
  }
}

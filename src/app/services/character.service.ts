import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationHelperService } from '../helpers/authorization/authorization-helper.service';
import { MasterDataService } from './master-data.service';
import { Character } from '../character-detail/character';
import { lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseUrl = 'http://localhost:3000'; // TOOD: [YD] Connectivity details
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

    let filteredArr = this.nestedFilter(this.characterDetails, filterParams);

    return filteredArr;
  }

  nestedFilter(targetArray: any[], filterParams: any): any {
    let filterKeys = Object.keys(filterParams);

    return targetArray.filter((obj) => {
      return filterKeys.every((key) => {
        if (filterParams[key] === '' || filterParams[key] === undefined) {
          return true;
        }

        return filterParams[key] === obj[key];
      });
    });
  }

  async loadAllCharacters() {
    if (this.characterDetails.length > 0) {
      return;
    }

    await this.loadFromServer();
  }

  private async loadFromServer() {
    const characterDetails = this.http.get(`${this.baseUrl}`, {
      headers: new HttpHeaders({
        authorization: this.authorizationHelperService.getToken(),
      }),
    });

    const serverData: any = await lastValueFrom(characterDetails);

    this.characterDetails = serverData.docs;

    this.loadMasterData();
  }

  loadMasterData() {
    this.masterDataService.prepareMasterData(this.characterDetails);
  }
}

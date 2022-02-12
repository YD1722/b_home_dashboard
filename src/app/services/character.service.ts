import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationHelperService } from '../helpers/authorization/authorization-helper.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseUrl = 'http://localhost:3000'; // TOOD: [YD] Connectivity details
  characterDetails = [];

  constructor(
    private http: HttpClient,
    private authorizationHelperService: AuthorizationHelperService
  ) {}

  getAllCharacters() {
    if (this.characterDetails.length > 0) {
      return this.characterDetails;
    }

    return this.http
      .get(`${this.baseUrl}`, {
        headers: new HttpHeaders({
          authorization: this.authorizationHelperService.getToken(),
        }),
      })
      .subscribe((data) => {

      });
  }
}

import {Injectable} from '@angular/core';
import {ROLES} from './roles';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHelperService {

  // TODO: Implement jwt sign
  getToken() {
    return ROLES.ADMIN;
  }
}

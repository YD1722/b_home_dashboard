import {Injectable} from '@angular/core';
import {ROLES} from './roles';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationHelperService {
  getToken() {
    return ROLES.ADMIN;
  }
}

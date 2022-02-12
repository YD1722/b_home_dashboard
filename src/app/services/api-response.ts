import {Character} from '../character-detail/character';

export interface ApiResponse {
  docs: Character[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

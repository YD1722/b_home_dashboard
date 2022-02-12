import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../character-detail/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string;
  characterDetailList: Character[] = [];

  constructor(private characterDetailService: CharacterService) {
    this.title = 'Lord of the rings';
  }

  ngOnInit(): void {
    this.characterDetailService.getAllCharacters();
  }
}

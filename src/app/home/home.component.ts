import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../character-detail/character';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string;
  characterDetailList: Character[] = [];

  @ViewChild(FilterComponent) filterComponent!: FilterComponent;

  constructor(private characterDetailService: CharacterService) {
    this.title = 'Lord of the rings';
  }

  ngOnInit(): void {
    this.characterDetailService.getAllCharacters().then((characterList) => {
      this.showTopResults(characterList);

      this.filterComponent.filterGroupForm.valueChanges.subscribe((data) => {
        this.filterCharacters(data);
      });
    });
  }

  private showTopResults(characterList: Character[]) {
    if (characterList === undefined || characterList.length === 0) {
      this.characterDetailList = [];
      return;
    }

    // const deleteCount =

    this.characterDetailList = characterList.slice(0, 3);
  }

  private async filterCharacters(filterParams: {}) {
    let filteredCharacterList =
      await this.characterDetailService.getFilteredCharacters(filterParams);
    this.showTopResults(filteredCharacterList);
  }
}

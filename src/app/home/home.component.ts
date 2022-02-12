import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../character-detail/character';
import {FilterComponent} from '../filter/filter.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title: string;
  characterDetailList: Character[] = [];
  subscriptions: Subscription;

  @ViewChild(FilterComponent) filterComponent!: FilterComponent;

  constructor(private characterDetailService: CharacterService) {
    this.title = 'Lord of the rings';
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.characterDetailService.getAllCharacters().then((characterList) => {
      this.showTopResults(characterList);
      this.addSubscriptions();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private addSubscriptions() {
    this.subscriptions.add(
      this.filterComponent.filterGroupForm.valueChanges.subscribe(
        (filterParams) => {
          this.filterCharacters(filterParams);
        }
      )
    );
  }

  private showTopResults(characterList: Character[]) {
    if (characterList === undefined || characterList.length === 0) {
      this.characterDetailList = [];
      return;
    }

    this.characterDetailList = characterList.slice(0, 3);
  }

  private async filterCharacters(filterParams: {}) {
    let filteredCharacterList =
      await this.characterDetailService.getFilteredCharacters(filterParams);

    this.showTopResults(filteredCharacterList);
  }
}

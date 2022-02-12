export class Character {
  height = '';
  race = '';
  gender = '';
  birth = '';
  spouse = '';
  death = '';
  realm = '';
  hair = '';
  name = '';
  wikiUrl = '';

  parseAPIData(apiData: any) {
    if (this.isDefined(apiData.height)) {
      this.height = apiData.height;
    }
    if (this.isDefined(apiData.race)) {
      this.race = apiData.race;
    }
    if (this.isDefined(apiData.gender)) {
      if (apiData.gender === 'Males' || apiData.gender === 'male') {
        apiData.gender = 'Male';
      }

      this.gender = apiData.gender;
    }
    if (this.isDefined(apiData.birth)) {
      this.birth = apiData.birth;
    }
    if (this.isDefined(apiData.spouse)) {
      this.spouse = apiData.spouse;
    }
    if (this.isDefined(apiData.death)) {
      this.death = apiData.death;
    }
    if (this.isDefined(apiData.realm)) {
      this.realm = apiData.realm;
    }
    if (this.isDefined(apiData.hair)) {
      this.hair = apiData.hair;
    }
    if (this.isDefined(apiData.name)) {
      this.name = apiData.name;
    }
    if (this.isDefined(apiData.wikiUrl)) {
      this.wikiUrl = apiData.wikiUrl;
    }
  }

  private isDefined(value: string): boolean {
    if (
      value === undefined ||
      value === 'NaN' ||
      value === 'none' ||
      value === ''
    ) {
      return false;
    }

    return true;
  }
}

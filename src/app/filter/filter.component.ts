import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  cities!: any[];
  selectedCity: any;

  filterGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filterGroupForm = this.formBuilder.group({
      name: '',
      hair: '',
      gender: '',
      race: '',
    });

    this.prepareDropdownOptions();
  }

  private prepareDropdownOptions() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  ngOnInit(): void {
    this.filterGroupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}

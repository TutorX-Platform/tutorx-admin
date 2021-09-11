import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";
import {Payment} from "../../../models/payment";
import * as constants from '../../../models/constants';
import {MatDialog} from "@angular/material/dialog";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tutorCtrl = new FormControl();
  minValue = new FormControl();
  maxValue =  new FormControl();
  filteredTutors: Observable<string[]>;
  selectedTutors: string[] = [];
  allTutors: string[] = ['Sandun', 'Tharindu', 'Deeptha', 'Gayan', 'Kasun'];

  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  now = new Date();
  payments: Payment[] = [];
  dummyAvatar = constants.dummy_profile_picture;
  // @ts-ignore
  selectedValue: string;
  states = [
    "Recent Payments First",
    "Old Payments First"
  ];

  months = [
    {
      code: 'JAN',
      name: 'January'
    },
    {
      code: 'FEB',
      name: 'February'
    },
    {
      code: 'MAR',
      name: 'March'
    }
  ]

  constructor(private dashboardService: DashboardService, private dialog: MatDialog) {
    this.filteredTutors = this.tutorCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTutors.slice()));
  }

  ngOnInit(): void {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      this.dashboardService.findPayments().valueChanges().subscribe(
        (res) => {
          this.payments = res;
          progressDialog.close();
        }, () => {
          progressDialog.close();
        }
      )
    })
    this.selectedValue = this.states[0];
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && this.allTutors.includes(value)) {
      this.selectedTutors.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tutorCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedTutors.indexOf(fruit);

    if (index >= 0) {
      this.selectedTutors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTutors.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tutorCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTutors.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}

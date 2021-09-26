import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {Student} from "../../../models/student";

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
  maxValue = new FormControl();
  // @ts-ignore
  filteredTutors: Observable<string[]>;
  selectedTutors: string[] = [];
  tutors: Student[] = [];

  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  now = new Date();
  payments: Payment[] = [];
  allPayments: Payment[] = [];
  dummyAvatar = constants.dummy_profile_picture;
  // @ts-ignore
  selectedValue: string;
  states = [
    "Recent Payments First",
    "Old Payments First"
  ];

  months = [
    {
      code: 1,
      name: 'January'
    },
    {
      code: 2,
      name: 'February'
    },
    {
      code: 3,
      name: 'March'
    },
    {
      code: 4,
      name: 'April'
    },
    {
      code: 5,
      name: 'May'
    },
    {
      code: 6,
      name: 'Juny'
    },
    {
      code: 7,
      name: 'July'
    },
    {
      code: 8,
      name: 'August'
    },
    {
      code: 9,
      name: 'September'
    },
    {
      code: 10,
      name: 'October'
    },
    {
      code: 11,
      name: 'November'
    },
    {
      code: 12,
      name: 'December'
    },
  ]

  constructor(private dashboardService: DashboardService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      this.dashboardService.findPayments().valueChanges().subscribe(
        (res) => {
          this.payments = res;
          this.allPayments = res;
          progressDialog.close();
        }, () => {
          progressDialog.close();
        }
      )
    })

    this.dashboardService.findTutors().valueChanges().subscribe(
      (res) => {
        this.tutors = res;
        this.dashboardService.allTutors = [];
        this.tutors.forEach(name => {
            console.log(name.firstName)
            this.dashboardService.allTutors.push(name.firstName);
          }
        );
        this.filteredTutors = this.tutorCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) => fruit ? this._filter(fruit) : this.dashboardService.allTutors.slice()));
      }
    )
    this.selectedValue = this.states[0];
    console.log(this.dashboardService.allTutors);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value && this.dashboardService.allTutors.includes(value)) {
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

    if (this.selectedTutors.length > 0) {
      this.dashboardService.findPaymentsByTutor(this.selectedTutors).valueChanges().subscribe(
        (res) => {
          console.log(res);
          this.payments = res;
        }
      )
    } else {
      this.dashboardService.findPayments().valueChanges().subscribe(
        (res) => {
          this.payments = res;
          this.allPayments = res;
        }, () => {
        }
      )
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTutors.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tutorCtrl.setValue(null);

    this.dashboardService.findPaymentsByTutor(this.selectedTutors).valueChanges().subscribe(
      (res) => {
        console.log(res);
        this.payments = res;
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.dashboardService.allTutors.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  monthFilter(value: number) {
    this.dashboardService.getPaymentsByMonthForTutor(value).valueChanges().subscribe(res => {
      this.payments = res;
    })
  }

  onSortChange(value: string) {
    if (value === 'Recent Payments First') {
      this.payments.reverse();
    } else {
      this.payments.reverse();
    }
  }

}

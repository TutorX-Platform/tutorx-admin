import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Student} from "../../../models/student";
import {DashboardService} from "../../../services/dashboard.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import * as constants from '../../../models/constants';
import {AddTutorComponent} from "../add-tutor/add-tutor.component";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-manage-tutors',
  templateUrl: './manage-tutors.component.html',
  styleUrls: ['./manage-tutors.component.scss']
})
export class ManageTutorsComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tutorCtrl = new FormControl();
  filteredTutors: Observable<string[]>;
  selectedTutors: string[] = [];
  allTutors: string[] = ['Sandun', 'Tharindu', 'Deeptha', 'Gayan', 'Kasun'];

  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {
    this.filteredTutors = this.tutorCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTutors.slice()));
  }

  searchControl = new FormControl();
  contactForm!: FormGroup;
  tutors: Student[] = [];
  rating = 3;

  numbers = [1, 2, 3];
  // @ts-ignore
  selectedValue: string;
  states = [
    "Active",
    "Inactive",
  ];

  ngOnInit(): void {
    this.selectedValue = this.states[0];
    this.contactForm = this.fb.group({
      country: [null]
    });

    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      this.dashboardService.findTutors().valueChanges().subscribe(
        (res) => {
          this.tutors = res;
          progressDialog.close()
        }, () => {
          progressDialog.close();
        }
      )
    })
  }

  onAddTutor(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    // dialogConfig.height = "100%";
    const dialogRef = this.dialog.open(AddTutorComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //   (result) => {
    //     if (result) {
    //       if (this.authService.isLoggedIn) {
    //         this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
    //       }
    //     }
    //   }
    // )
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

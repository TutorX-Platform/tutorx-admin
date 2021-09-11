import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Student} from "../../../models/student";
import {DashboardService} from "../../../services/dashboard.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import * as constants from '../../../models/constants';
import {AddTutorComponent} from "../add-tutor/add-tutor.component";
import {Tutor} from "../../../models/tutor";

@Component({
  selector: 'app-manage-tutors',
  templateUrl: './manage-tutors.component.html',
  styleUrls: ['./manage-tutors.component.scss']
})
export class ManageTutorsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {
  }

  contactForm!: FormGroup;
  tutors: Tutor[] = [];
  rating = 3;

  numbers = [1, 2, 3];
  countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
  ];

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      country: [null]
    });

    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(() => {
      this.dashboardService.findTutors().valueChanges().subscribe(
        (res) => {
          this.tutors = res;
          this.mapEarningsToTutor();
          progressDialog.close()
        }, () => {
          progressDialog.close();
        }
      )
    })
  }

  mapEarningsToTutor() {
    this.dashboardService.findTutorPayments().valueChanges().subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

  onAddTutor() {
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
}

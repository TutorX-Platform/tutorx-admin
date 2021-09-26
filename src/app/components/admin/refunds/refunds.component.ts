import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Refund} from "../../../models/refunds";
import {DashboardService} from "../../../services/dashboard.service";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import * as constants from "../../../models/constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UtilService} from "../../../services/util-service.service";
import * as systemMessages from '../../../models/system-messages';
import {MessageRequestComponent} from "../message-request/message-request.component";

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private utilService: UtilService
  ) {
  }

  // @ts-ignore
  selectedValue: string;
  states = [
    "Recent Payments First",
    "Old Payments First"
  ];
  now = new Date();
  contactForm!: FormGroup;
  refunds: Refund[] = [];
  allRefunds: Refund[] = [];

  numbers = [1, 2, 3];
  countries = [
    {id: 1, name: "United States"},
    {id: 2, name: "Australia"},
    {id: 3, name: "Canada"},
    {id: 4, name: "Brazil"},
    {id: 5, name: "England"}
  ];

  ngOnInit(): void {
    this.selectedValue = this.states[0];
    this.contactForm = this.fb.group({
      country: [null]
    });
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      () => {
        this.dashboardService.findRefunds().valueChanges().subscribe(
          (res) => {
            this.refunds = res;
            this.allRefunds = res;
            progressDialog.close();
          }
        )
      }
    )
  }

  onApprove(refundId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '650px';
    dialogConfig.data = refundId;
    // dialogConfig.height = "810px";
    const dialogRef = this.dialog.open(MessageRequestComponent, dialogConfig);
  }

  onSortChange(value: string) {
   this.refunds.reverse();
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Refund} from "../../../models/refunds";
import {DashboardService} from "../../../services/dashboard.service";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";
import * as constants from "../../../models/constants";
import {MatDialog} from "@angular/material/dialog";
import {UtilService} from "../../../services/util-service.service";
import * as systemMessages from '../../../models/system-messages';

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

  contactForm!: FormGroup;
  refunds: Refund[] = []

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
    progressDialog.afterOpened().subscribe(
      () => {
        this.dashboardService.findRefunds().valueChanges().subscribe(
          (res) => {
            this.refunds = res;
            progressDialog.close();
          }
        )
      }
    )
  }

  onApprove(refundId: string) {
    this.utilService.openDialog(systemMessages.questionTitles.approveRefundRequest, systemMessages.questionMessages.approveRefundRequest, constants.messageTypes.confirmation).afterClosed().subscribe(
      (res) => {
        if (res) {
          this.dashboardService.approveRefund(refundId);
        }
      }
    )
  }

}

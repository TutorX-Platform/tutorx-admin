import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";
import {Payment} from "../../../models/payment";
import * as constants from '../../../models/constants';
import {MatDialog} from "@angular/material/dialog";
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  now = new Date();
  payments: Payment[] = [];
  dummyAvatar = constants.dummy_profile_picture;

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
  }

}

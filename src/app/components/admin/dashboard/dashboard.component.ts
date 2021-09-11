import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";
import {forkJoin} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import * as constants from '../../../models/constants';
import {ProgressDialogComponent} from '../../shared/progress-dialog/progress-dialog.component';
import {Chat} from "../../../models/chat";
import {Payment} from "../../../models/payment";
import {UtilService} from "../../../services/util-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  numbers = [1, 2, 3];
  totalUsers: number = 0;
  totalQuestions: number = 0;
  inProgressQuestions: number = 0;
  completedQuestions: number = 0;
  totalEarnings: number = 0;
  recentChats: Chat[] = [];
  payments: Payment[] = [];

  constructor(private dashboardService: DashboardService,
              private utilService: UtilService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCountDetails();
    this.findChats();
    this.findPayments();
  }


  getCountDetails() {
    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    progressDialog.afterOpened().subscribe(
      () => {
        this.dashboardService.findStats().valueChanges().subscribe(
          (res) => {
            this.totalEarnings = res.payments;
            this.inProgressQuestions = res.inprogressQuestions;
            this.totalQuestions = res.questionCount;
            this.completedQuestions = res.completedQuestions;
            this.totalUsers = res.userCount;
            progressDialog.close();
          }
        )
      }
    )
  }

  findChats() {
    this.dashboardService.findRecentChats().valueChanges().subscribe(
      (res) => {
        this.recentChats = res;
      }
    )
  }

  findPayments() {
    this.dashboardService.findRecentPayments().valueChanges().subscribe(
      (res) => {
        console.log(res);
        this.payments = res;
      }
    )
  }

  onViewChat(id: string) {
    console.log(id);
    this.utilService.getTimeFromTimeAPI().subscribe(
      (res) => {
        console.log('sent');
        // @ts-ignore
        this.dashboardService.sendAdminMonitoringChatMsg(res.time, id);
      }
    )
  }

}

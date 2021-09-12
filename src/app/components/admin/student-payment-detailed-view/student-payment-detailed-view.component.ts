import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-payment-detailed-view',
  templateUrl: './student-payment-detailed-view.component.html',
  styleUrls: ['./student-payment-detailed-view.component.scss']
})
export class StudentPaymentDetailedViewComponent implements OnInit {

  date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}

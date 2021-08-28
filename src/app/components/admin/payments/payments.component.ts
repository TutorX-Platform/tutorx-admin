import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  now = new Date();
  months =[
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
  constructor() { }

  ngOnInit(): void {
  }

}

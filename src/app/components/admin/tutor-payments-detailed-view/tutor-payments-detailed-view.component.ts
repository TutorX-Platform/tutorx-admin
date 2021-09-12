import { Component, OnInit } from '@angular/core';
import * as constants from "../../../models/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tutor-payments-detailed-view',
  templateUrl: './tutor-payments-detailed-view.component.html',
  styleUrls: ['./tutor-payments-detailed-view.component.scss']
})
export class TutorPaymentsDetailedViewComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  rating = 3;
  date = new Date();

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate([constants.routes.admin + constants.routes.manageTutors],{skipLocationChange: true});
  }

}

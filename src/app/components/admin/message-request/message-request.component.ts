import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../../../services/dashboard.service";

@Component({
  selector: 'app-message-request',
  templateUrl: './message-request.component.html',
  styleUrls: ['./message-request.component.scss']
})
export class MessageRequestComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  data: any;

  constructor(
    private dialogRef: MatDialogRef<MessageRequestComponent>,
    private dashboardService: DashboardService,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data !== null) {
      this.data = data;
      // this.isFormDisabled = true;
    }
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onDone() {
    this.dashboardService.approveRefund(this.data, this.form.value.amount, this.form.value.message).then(
      () => {
        this.dialogRef.close();
      }
    );
  }

}

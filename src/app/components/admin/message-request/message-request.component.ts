import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-message-request',
  templateUrl: './message-request.component.html',
  styleUrls: ['./message-request.component.scss']
})
export class MessageRequestComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<MessageRequestComponent>,
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      name:  new FormControl('', Validators.required),
      amount:  new FormControl('', Validators.required),
      title:  new FormControl('', Validators.required),
      message:  new FormControl('', Validators.required)
    });
  }

  onClose(){
    this.dialogRef.close();
  }

}

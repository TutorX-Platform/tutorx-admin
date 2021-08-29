import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as constants from '../../models/constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  // @ts-ignore
  signInForm: FormGroup;
  emailPattern = constants.regexp_patterns.email;

  constructor(
    private formBuilder: FormBuilder,) { }


  ngOnInit(): void {
    this.initializeSignInForm();
  }

  initializeSignInForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSignIn() {
    // if (this.signInForm.valid) {
    //   const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    //   progressDialog.afterOpened().subscribe(
    //     () => {
    //       this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password, progressDialog).then(
    //         (res) => {
    //           this.dialogRef.close();
    //           console.log(res);
    //         }
    //       );
    //     }
    //   )
    // } else {
    //   alert("please fill form");
    // }
  }

  onGoogleSignIn() {
    // this.authService.googleAuth().then(r => {
    //   this.dialogRef.close();
    // });
  }

}

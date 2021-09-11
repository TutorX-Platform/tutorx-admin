import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as constants from "../../../models/constants";

@Component({
  selector: 'app-add-tutor',
  templateUrl: './add-tutor.component.html',
  styleUrls: ['./add-tutor.component.scss']
})
export class AddTutorComponent implements OnInit {

  // @ts-ignore
  tutorAddForm: FormGroup;
  emailPattern = constants.regexp_patterns.email;
  subjects: string[] = ['Maths', 'Computer Science', 'Geography'];
  subCategoryMaths: string[] = ['math1', 'math2'];
  subCategoryScience: string[] = ['com1', 'com2'];
  subCategory: string[] = [];
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tutorAddForm = new FormGroup({
      name:  new FormControl('', Validators.required),
      email:  new FormControl('', Validators.required),
      phoneNumber:  new FormControl('', Validators.required),
      street:  new FormControl('', Validators.required),
      city:  new FormControl('', Validators.required),
      country:  new FormControl('', Validators.required),
      postalCode:  new FormControl('', Validators.required),
      password:  new FormControl('', Validators.required),
      confirmPassword:  new FormControl('', Validators.required),
      subjectList:  new FormControl('', Validators.required),
      subjectSubCategoryList:  new FormControl('', Validators.required),
    });
  }

  onSubjectBlur(){
    const subject = this.tutorAddForm.value.subjectList;
    console.log(subject, 'hi');
    if (subject === 'Maths') {
      this.subCategory = this.subCategoryMaths;
    }
    if (subject === 'Computer Science') {
      this.subCategory = this.subCategoryScience;
    }
  }

}

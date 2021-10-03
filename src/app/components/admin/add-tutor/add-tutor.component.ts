import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {finalize} from "rxjs/operators";
import {UtilService} from "../../../services/util-service.service";
import * as systemMessages from '../../../models/system-messages';
import * as constants from '../../../models/constants';
import {ProgressDialogComponent} from "../../shared/progress-dialog/progress-dialog.component";

@Component({
  selector: 'app-add-tutor',
  templateUrl: './add-tutor.component.html',
  styleUrls: ['./add-tutor.component.scss']
})
export class AddTutorComponent implements OnInit {

  // @ts-ignore
  tutorAddForm: FormGroup;
  emailPattern = constants.regexp_patterns.email;
  subjects = constants.subjects;
  subCategoryMaths: string[] = ['math1', 'math2'];
  subCategoryScience: string[] = ['com1', 'com2'];
  subCategory1: string[] = [];
  subCategory2: string[] = [];
  subCategory3: string[] = [];
  subCategory4: string[] = [];
  subCategory5: string[] = [];
  imageUrl = '';
  // @ts-ignore
  file: File;
  // @ts-ignore
  task: AngularFireUploadTask;
  // @ts-ignore
  percentage: Observable<number>;
  // @ts-ignore
  snapshot: Observable<string>;
  // @ts-ignore
  taskRef: AngularFireStorageReference;
  // @ts-ignore
  downloadUrl: Observable<string>;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private utilService: UtilService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  filePath: string = 'assets/images/profile.jpg';

  handle(e: any) {
    console.log('Change input file', e.target.files)
    // @ts-ignore
    const file = (e.target as HTMLInputElement).files[0];
    this.file = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  uploadNewImage() {
    const time = new Date().getTime();
    // @ts-ignore
    const path = constants.storage_collections.profile_data + constants.url_sign.url_separator + constants.userTypes.tutor + constants.url_sign.url_separator + time + constants.url_sign.underscore + this.file.name;
    this.taskRef = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);

    this.task.percentageChanges().subscribe(
      (res) => {
        console.log(res);
      }
    )

    const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
    // @ts-ignore
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(finalize(() => {
      this.taskRef.getDownloadURL().subscribe((url: string) => {
        this.imageUrl = url;
        progressDialog.close();
      }, () => {
        this.utilService.openDialog(systemMessages.questionTitles.fileUploadError, systemMessages.questionMessages.fileUploadError, constants.messageTypes.warningInfo).afterOpened().subscribe(
          (res) => {
            progressDialog.close();
            console.log(res);
          }
        )
      })
    })).subscribe()
  }

  createForm() {
    this.tutorAddForm = new FormGroup({
      visibleName: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      subjectList1: new FormControl('', Validators.required),
      subjectList2: new FormControl(''),
      subjectList3: new FormControl(''),
      subjectList4: new FormControl(''),
      subjectList5: new FormControl(''),
      subjectSubCategoryList1: new FormControl('', Validators.required),
      subjectSubCategoryList2: new FormControl(''),
      subjectSubCategoryList3: new FormControl(''),
      subjectSubCategoryList4: new FormControl(''),
      subjectSubCategoryList5: new FormControl(''),
      bankName: new FormControl(''),
      branch: new FormControl(''),
      accNo: new FormControl(''),
    });
  }

  onSubjectBlur(num: number) {
    let subject = null;
    if( num === 1){
      // @ts-ignore
      this.tutorAddForm.get('subjectSubCategoryList1').setValue('');
      subject = this.tutorAddForm.value.subjectList1;
      this.subCategory1 = [];
      if (subject === constants.subjectCodes.mathematics) {
        this.subCategory1 = constants.mathsSubjects;
      } else if (subject === constants.subjectCodes.engineering) {
        this.subCategory1 = constants.engineeringSubjects;
      } else if (subject === constants.subjectCodes.computer_science) {
        this.subCategory1 = constants.csSubjects;
      } else if (subject === constants.subjectCodes.management) {
        this.subCategory1 = constants.managementSubjects;
      } else if (subject === constants.subjectCodes.physics) {
        this.subCategory1 = constants.physicsSubjects;
      }
    } else if( num === 2){
      // @ts-ignore
      this.tutorAddForm.get('subjectSubCategoryList2').setValue('');
      subject = this.tutorAddForm.value.subjectList2;
      this.subCategory2 = [];
      if (subject === constants.subjectCodes.mathematics) {
        this.subCategory2 = constants.mathsSubjects;
      } else if (subject === constants.subjectCodes.engineering) {
        this.subCategory2 = constants.engineeringSubjects;
      } else if (subject === constants.subjectCodes.computer_science) {
        this.subCategory2 = constants.csSubjects;
      } else if (subject === constants.subjectCodes.management) {
        this.subCategory2 = constants.managementSubjects;
      } else if (subject === constants.subjectCodes.physics) {
        this.subCategory2 = constants.physicsSubjects;
      }
    } else if( num === 3){
      // @ts-ignore
      this.tutorAddForm.get('subjectSubCategoryList3').setValue('');
      subject = this.tutorAddForm.value.subjectList3;
      this.subCategory3 = [];
      if (subject === constants.subjectCodes.mathematics) {
        this.subCategory3 = constants.mathsSubjects;
      } else if (subject === constants.subjectCodes.engineering) {
        this.subCategory3 = constants.engineeringSubjects;
      } else if (subject === constants.subjectCodes.computer_science) {
        this.subCategory3 = constants.csSubjects;
      } else if (subject === constants.subjectCodes.management) {
        this.subCategory3 = constants.managementSubjects;
      } else if (subject === constants.subjectCodes.physics) {
        this.subCategory3 = constants.physicsSubjects;
      }
    } else if( num === 4){
      // @ts-ignore
      this.tutorAddForm.get('subjectSubCategoryList4').setValue('');
      subject = this.tutorAddForm.value.subjectList4;
      this.subCategory4 = [];
      if (subject === constants.subjectCodes.mathematics) {
        this.subCategory4 = constants.mathsSubjects;
      } else if (subject === constants.subjectCodes.engineering) {
        this.subCategory4 = constants.engineeringSubjects;
      } else if (subject === constants.subjectCodes.computer_science) {
        this.subCategory4 = constants.csSubjects;
      } else if (subject === constants.subjectCodes.management) {
        this.subCategory4 = constants.managementSubjects;
      } else if (subject === constants.subjectCodes.physics) {
        this.subCategory4 = constants.physicsSubjects;
      }
    } else if( num === 5){
      // @ts-ignore
      this.tutorAddForm.get('subjectSubCategoryList5').setValue('');
      subject = this.tutorAddForm.value.subjectList5;
      this.subCategory5 = [];
      if (subject === constants.subjectCodes.mathematics) {
        this.subCategory5 = constants.mathsSubjects;
      } else if (subject === constants.subjectCodes.engineering) {
        this.subCategory5 = constants.engineeringSubjects;
      } else if (subject === constants.subjectCodes.computer_science) {
        this.subCategory5 = constants.csSubjects;
      } else if (subject === constants.subjectCodes.management) {
        this.subCategory5 = constants.managementSubjects;
      } else if (subject === constants.subjectCodes.physics) {
        this.subCategory5 = constants.physicsSubjects;
      }
    }

  }

  onDone() {
    const email = this.tutorAddForm.value.email;
    const password = this.tutorAddForm.value.password;
    const firstname = this.tutorAddForm.value.fullName;
    let subCategory: string[] = [];
    subCategory = (this.tutorAddForm.value.subjectSubCategoryList1);
    if(this.tutorAddForm.value.subjectSubCategoryList2 !== null && this.tutorAddForm.value.subjectSubCategoryList2 !== '' && this.tutorAddForm.value.subjectSubCategoryList2 !== undefined) {
      // @ts-ignore
      this.tutorAddForm.value.subjectSubCategoryList2.forEach( (cat) => {
        subCategory.push(cat);
      })
    }
    if(this.tutorAddForm.value.subjectSubCategoryList3 !== null && this.tutorAddForm.value.subjectSubCategoryList3 !== '' && this.tutorAddForm.value.subjectSubCategoryList3 !== undefined) {
      // @ts-ignore
      this.tutorAddForm.value.subjectSubCategoryList3.forEach( (cat) => {
        subCategory.push(cat);
      })
    }
    if(this.tutorAddForm.value.subjectSubCategoryList4 !== null && this.tutorAddForm.value.subjectSubCategoryList4 !== '' && this.tutorAddForm.value.subjectSubCategoryList4 !== undefined) {
      // @ts-ignore
      this.tutorAddForm.value.subjectSubCategoryList4.forEach( (cat) => {
        subCategory.push(cat);
      })
    }
    if(this.tutorAddForm.value.subjectSubCategoryList5 !== null && this.tutorAddForm.value.subjectSubCategoryList5 !== '' && this.tutorAddForm.value.subjectSubCategoryList5 !== undefined) {
      // @ts-ignore
      this.tutorAddForm.value.subjectSubCategoryList5.forEach( (cat) => {
        subCategory.push(cat);
      })
    }
    // subCategory.push(this.tutorAddForm.value.subjectSubCategoryList2);
    // subCategory.push(this.tutorAddForm.value.subjectSubCategoryList3);
    // subCategory.push(this.tutorAddForm.value.subjectSubCategoryList4);
    // subCategory.push(this.tutorAddForm.value.subjectSubCategoryList5);
    let subject: string[] = [];
    subject.push(this.tutorAddForm.value.subjectList1);
    subject.push(this.tutorAddForm.value.subjectList2);
    subject.push(this.tutorAddForm.value.subjectList3);
    subject.push(this.tutorAddForm.value.subjectList4);
    subject.push(this.tutorAddForm.value.subjectList5);
    const phoneNumber = this.tutorAddForm.value.phoneNumber;
    const street = this.tutorAddForm.value.street;
    const city = this.tutorAddForm.value.city;
    const country = this.tutorAddForm.value.country;
    const visibleName = this.tutorAddForm.value.visibleName;
    const bankName = this.tutorAddForm.value.bankName;
    const branchName = this.tutorAddForm.value.branch;
    const accNo = this.tutorAddForm.value.accNo;
    const description = this.tutorAddForm.value.description;
    let image;
    if (this.imageUrl === '') {
      image = null;
    } else {
      image = this.imageUrl;
    }
    // @ts-ignore
    this.authService.registerATutor(email, password, firstname, image, '', subCategory, subject, phoneNumber, street, city, country, visibleName, bankName, branchName, accNo, description).add(() => {
      this.dialog.closeAll()
    });
  }

}

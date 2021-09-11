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
  subjects: string[] = ['Maths', 'Computer Science', 'Geography'];
  subCategoryMaths: string[] = ['math1', 'math2'];
  subCategoryScience: string[] = ['com1', 'com2'];
  subCategory: string[] = [];
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
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      subjectList: new FormControl('', Validators.required),
      subjectSubCategoryList: new FormControl('', Validators.required),
    });
  }

  onSubjectBlur() {
    const subject = this.tutorAddForm.value.subjectList;
    console.log(subject, 'hi');
    if (subject === 'Maths') {
      this.subCategory = this.subCategoryMaths;
    }
    if (subject === 'Computer Science') {
      this.subCategory = this.subCategoryScience;
    }
  }

  onDone() {
    const email = this.tutorAddForm.value.email;
    const password = this.tutorAddForm.value.password;
    const firstname = this.tutorAddForm.value.name;
    const subCategory = this.tutorAddForm.value.subjectSubCategoryList;
    const subject = this.tutorAddForm.value.subjectList;
    const phoneNumber = this.tutorAddForm.value.phoneNumber;
    const street = this.tutorAddForm.value.street;
    const city = this.tutorAddForm.value.city;
    const country = this.tutorAddForm.value.country;
    let image;
    if (this.imageUrl === '') {
      image = null;
    } else {
      image = this.imageUrl;
    }
    // @ts-ignore
    this.authService.registerATutor(email, password, firstname, image, '', subCategory, subject, phoneNumber, street, city, country);
    this.dialog.closeAll();
  }

}

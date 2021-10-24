import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
// import {WelcomeComponent} from '../../student/welcome/welcome.component';
import {AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference} from 'angularfire2/storage';
import {Observable} from "rxjs";
import * as constants from '../../../models/constants';
import {QuestionService} from "../../../services/question-service.service";
import {Questions} from "../../../models/questions";
import {UtilService} from "../../../services/util-service.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ProgressDialogComponent} from "../progress-dialog/progress-dialog.component";
import {map, startWith} from 'rxjs/operators';
import {MailService} from "../../../services/mail.service";
import {ChatServiceService} from "../../../services/chat-service.service";
import {Chat} from "../../../models/chat";
import {ChatMsg} from "../../../models/chat-msg";
import {TimeApi} from "../../../models/time-api";
import * as systemMessages from '../../../models/system-messages';
import {StudentService} from "../../../services/student-service.service";
import {Attachment} from "../../../models/Attachment";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  addQuestionForm!: FormGroup;
  status = 'open';
  date!: Date;
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
  uploadedFiles: Attachment[] = [];
  askedQuestions = [];
  studentUniqueKey = '';
  files: File[] = [];
  subjectList: string[] = [];

  options = constants.subjects;
  subOptions: string[] = [];
  selectedSubject: string = '';
  subCategoryList: string[] = [];
  filteredOptions?: Observable<string[]>;
  filteredSubOptions?: Observable<string[]>;
  questionId = '';
  uploadedSize: number = 0;
  data = null;
  role = '';
  questionTitle = '';
  isFormDisabled = false;

  subject = '';
  subjects = '';
  dueDateTime = '';
  description = '';
  subCategory = '';
  time: TimeApi = {status: "", time: 0};

  attachments: Attachment[] = [];


  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionComponent>,
    // private welcomeRef: MatDialogRef<WelcomeComponent>,
    private storage: AngularFireStorage,
    private questionService: QuestionService,
    private utilService: UtilService,
    private authService: AuthService,
    private studentService: StudentService,
    public router: Router,
    private mailService: MailService,
    private chatService: ChatServiceService,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data !== null) {
      this.data = data;
      // this.isFormDisabled = true;
    }
  }

  ngOnInit(): void {
    this.questionId = this.utilService.generateUniqueKey(constants.genKey.question);
    this.subjectList = constants.subjects;
    this.date = new Date();
    this.filteredOptions = this.addQuestionForm.controls['subject'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );

    this.filteredSubOptions = this.addQuestionForm.controls['subCategory'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._subfilter(value))
    );

    if (this.data !== null) {
      // @ts-ignore
      this.questionTitle = this.data.title;
      // @ts-ignore
      this.status = this.data.status;
        this.patchValues();
    }
  }

  patchValues() {
    // @ts-ignore
    this.subjects = this.data.subjects;
    // @ts-ignore
    this.dueDateTime = this.data.dueDate.toDate();
    // @ts-ignore
    this.description = this.data.description;
    // @ts-ignore
    this.attachments = this.data.attachments;
    // @ts-ignore
    this.subCategory = this.data.subCategory;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.options.filter(option => option.toLowerCase().includes(filterValue)).length === 1) {
      this.selectedSubject = this.options.filter(option => option.toLowerCase().includes(filterValue))[0];
      if (this.selectedSubject === constants.subjectCodes.mathematics) {
        this.subOptions.push(...constants.mathsSubjects)
      }
      if (this.selectedSubject === constants.subjectCodes.management) {
        this.subOptions = constants.managementSubjects;
      }
      if (this.selectedSubject === constants.subjectCodes.physics) {
        this.subOptions = constants.physicsSubjects;
      }
      if (this.selectedSubject === constants.subjectCodes.computer_science) {
        this.subOptions = constants.csSubjects;
        console.log(this.subOptions);
      }
    }
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _subfilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.subOptions);
    console.log(this.subOptions.filter(option => option.toLowerCase().includes(filterValue)));
    return this.subOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}

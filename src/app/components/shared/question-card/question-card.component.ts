import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as constants from '../../../models/constants';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddQuestionComponent} from "../add-question/add-question.component";
import {QuestionService} from "../../../services/question-service.service";
import {AuthService} from "../../../services/auth.service";
import {StudentService} from "../../../services/student-service.service";
import {Attachment} from "../../../models/Attachment";

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {

  @Input() public id: string = '';
  @Input() public title: string = '';
  @Input() public status: string = '';
  @Input() public subjects: string = '';
  @Input() public subCategory: string = '';
  @Input() public dueDate: any = new Date;
  @Input() public descriptionTitle: string = 'Hi Tutors';
  @Input() public description: string = '';
  @Input() public attachments: Attachment[] = [];
  @Input() public viewedByAmount: number = 0;
  @Input() public isTutorJoined: boolean = true;
  @Input() public studentEmail: string = '';
  @Input() public isPublicPool: boolean = false;
  @Input() public isAutoOpen: boolean = false;
  @Input() public lastAssignedTutorName: string = '';
  @Input() public lastAssignedTutorImage: string = '';
  @Input() public byLoggedUser: boolean = false;

  isTutor = false;

  role = '';
  defaultTutorAvatar = constants.dummy_profile_picture;

  constructor(private router: Router,
              private dialog: MatDialog,
              private questionService: QuestionService,
              private studentService: StudentService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.studentService.currentStudent.role === constants.userTypes.tutor) {
      this.isTutor = true;
    }
    if (this.authService.student.role === constants.userTypes.tutor) {
      this.isTutor = true;
    }
    this.role = this.studentService.currentStudent.role;
    if (this.isAutoOpen) {
      this.onViewDetails();
    }
  }

  onViewChat() {
    this.router.navigate(['' + constants.routes.chat, this.id], {skipLocationChange: true});
  }

  onViewDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.id,
      title: this.title,
      status: this.status,
      subjects: this.subjects,
      subCategory: this.subCategory,
      dueDate: this.dueDate,
      description: this.description,
      attachments: this.attachments,
      role: this.role,
      isTutor: true,
      studentEmail: this.studentEmail,
      lastAssignedTutorName: this.lastAssignedTutorName,
      lastAssignedTutorImage: this.lastAssignedTutorImage,
      byLoggedUser: this.byLoggedUser
    }
    dialogConfig.width = "100%";
    this.dialog.open(AddQuestionComponent, dialogConfig);
  }
}

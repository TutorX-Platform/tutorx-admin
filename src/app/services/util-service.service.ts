import {Injectable} from '@angular/core';
import * as constants from '../models/constants';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import * as systemMessages from "../models/system-messages";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient, private dialog: MatDialog,) {
  }

  generateChatLink(questionId: string, user: string) {
    const baseUrl = constants.env_url.prod_url;
    if (user === constants.userTypes.tutor) {
      return baseUrl.concat('/tutor/chat/').concat(questionId);
    } else if (user === constants.userTypes.student) {
      return baseUrl.concat('/student/chat/').concat(questionId);
    } else {
      return '';
    }
  }

  getTimeFromTimeAPI() {
    const urlParams: any = {};
    const httpOptions = {};
    return this.http.get(constants.backend_url.concat(constants.backend_api_resource.time), httpOptions);
  }

  // openDialog(title: string, message: string, type: string) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //     title: title,
  //     message: message,
  //     type: type,
  //   }
  //   return this.dialog.open(MessageDialogComponent, dialogConfig);
  // }

}

import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UtilService} from "./util-service.service";
import 'rxjs/add/operator/switchMap';
import {Student} from "../models/student";
import * as constants from '../models/constants';
import * as systemMessages from '../models/system-messages';
import * as firebase from 'firebase';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MailService} from "./mail.service";
import {StudentService} from "./student-service.service";
import {ProgressDialogComponent} from "../components/shared/progress-dialog/progress-dialog.component";
import {firestore} from "firebase";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isStudentSet = false;
  isLoggedIn = false;
  student: Student = {
    isAdmin: false,
    email: "",
    firstName: "",
    isVerified: "",
    lastName: "",
    profileImage: "",
    questions: [],
    uniqueKey: "",
    userId: "",
    role: ""
  };

  constructor(public angularFirestoreService: AngularFirestore,
              public angularFireAuth: AngularFireAuth,
              public router: Router,
              public utilService: UtilService,
              private mailService: MailService,
              private dialog: MatDialog,
              private http: HttpClient,
              private studentService: StudentService,
              public ngZone: NgZone) {
    this.angularFireAuth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        // @ts-ignore
        this.student.userId = user?.uid;
        // @ts-ignore
        this.student.email = user?.email;
        // @ts-ignore
        this.student.profileImage = user?.photoURL;
        this.userData = user;
        this.isLoggedIn = true;
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(this.userData));
        `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
        this.findUser(this.student.userId);
      } else {
        this.isLoggedIn = false;
        localStorage.removeItem(constants.localStorageKeys.user);
      }
    });
  }

  googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookAuth() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider: any) {
    return this.angularFireAuth.auth.signInWithPopup(provider).then((credentials => {
      if (credentials.user) {
        localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(credentials.user));
        `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
        this.userData = credentials.user;
        const progressDialog = this.dialog.open(ProgressDialogComponent, constants.getProgressDialogData());
        this.roleBasedRouting(credentials.user.uid, progressDialog);
        // @ts-ignore
        this.student.email = credentials.user?.email;
        // @ts-ignore
        this.student.firstName = credentials.user?.displayName;
        // @ts-ignore
        this.student.profileImage = credentials.user?.photoURL;
        // @ts-ignore
        this.student.userId = credentials.user?.uid;
        this.isStudentSet = true;
        // this.SetUserData(credentials.user, this.student.firstName);
      }
    }));
  }

  updateStudentData(user: User) {
    const studentRef: AngularFirestoreDocument<Student> = this.angularFirestoreService.doc(constants.collections.students + `/${user.uid}`);
    const student: Student = {
      isAdmin: false,
      email: user.email,
      firstName: user.displayName,
      isVerified: user.emailVerified,
      lastName: user.displayName,
      profileImage: '',
      questions: [],
      uniqueKey: this.generateUniqueKey(),
      userId: user.uid,
      role: constants.userTypes.student
    }
    studentRef.set(student);
  }

  generateUniqueKey() {
    return this.utilService.generateUniqueKey(constants.genKey.student);
  }

  // Sign in with email/password
  signIn(email: string, password: string, progressDialog: MatDialogRef<any>) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          localStorage.setItem(constants.localStorageKeys.user, JSON.stringify(result.user));
          `JSON.parse(<string>localStorage.getItem(constants.localStorageKeys.user));`
          this.userData = result.user;
          this.roleBasedRouting(result.user.uid, progressDialog);
        }
      }).catch((error) => {
        progressDialog.close();
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  signUp(email: string, password: string, firstName: string, progressDialog: MatDialogRef<any>) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoggedIn = true;
        this.SendVerificationMail();
        // @ts-ignore
        // this.SetUserData(result.user, firstName);
        // @ts-ignore
        this.roleBasedRouting(result.user.uid, progressDialog);
      }).catch((error) => {
        window.alert(error.message)
        progressDialog.close();

      })
  }

  SendVerificationMail() {
    // @ts-ignore
    return this.angularFireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate([constants.routes.student_q_pool], {skipLocationChange: true});
      })
  }

  // Sign out
  signOut() {
    return this.angularFireAuth.auth.signOut().then(() => {
      this.isLoggedIn = false;
      localStorage.removeItem(constants.localStorageKeys.user);
      this.router.navigate([constants.routes.sign_in], {skipLocationChange: true});
    })
  }

  SetUserData(user: any, firstName: string) {
    this.userData = user;
    const userRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`${constants.collections.students}/${user.uid}`);
    const userData: Student = {
      isAdmin: false,
      email: user.email,
      firstName: firstName,
      isVerified: "",
      lastName: firstName,
      profileImage: user.photoURL,
      questions: [],
      uniqueKey: this.utilService.generateUniqueKey(constants.userTypes.student),
      userId: user.uid,
      role: constants.userTypes.admin
    }
    this.student = userData;
    return userRef.set(userData, {
      merge: true
    });
  }

  getAuthenticated() {
    return this.angularFireAuth.authState.subscribe(
      (res) => {
        return res;
      }
    );
  }

  onSignOut() {
    this.isLoggedIn = false;
    localStorage.removeItem(constants.localStorageKeys.user);
    this.angularFireAuth.auth.signOut().then(
      (v) => {
        this.angularFireAuth.auth.onAuthStateChanged(
          (user) => {
            if (user) {
              console.log('signed In');
            } else {
              this.resetStudent();
            }
          }
        )
      }
    );
  }

  resetStudent() {
    const resetUser: Student = {
      isAdmin: false,
      email: "",
      firstName: "",
      isVerified: "",
      lastName: "",
      profileImage: "",
      questions: [],
      uniqueKey: "",
      userId: "",
      role: ''
    }

    this.student = resetUser;
  }

  roleBasedRouting(uid: string, progressDialog: MatDialogRef<any>) {
    this.studentService.findStudentById(uid).subscribe(
      (res) => {
        if (res) {
          // @ts-ignore
          const student: Student = res;
          this.student = student;
          if (student.isAdmin) {
            this.ngZone.run(() => {
              this.isLoggedIn = true;
              if (progressDialog) {
                progressDialog.close();
              }
              this.router.navigate([''], {skipLocationChange: true});
            });
          } else {
            this.utilService.openDialog(systemMessages.adminTitles.loginPermissionDenied, systemMessages.adminMessages.loginPermissionDenied, constants.messageTypes.warning).afterOpened().subscribe();
            this.mailService.unAuthorizedAccessToAdminScreen(this.student.email).subscribe();
            // window.location.reload()
            progressDialog.close();
          }
        } else {
          progressDialog.close();
        }
      }
    )
  }

  findUser(userId: string) {
    this.studentService.findStudentById(userId).subscribe(
      (res) => {
        // @ts-ignore
        this.student = res;
        // @ts-ignore
        this.studentService.currentStudent = res;
        console.log(res);
      }
    )
  }


  saveTutor(email: string, userId: string, firstName: string, imageUrl: string, lastname: string, subject: string, subCategory: string[], phoneNumber: string, street: string, city: string, country: string, visibleName: string, bankName: string, branch: string, accountNumber: string, description: string) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestoreService.doc(`${constants.collections.students}/${userId}`);
    const userData: any = {
      email: email,
      firstName: firstName,
      visibleName: visibleName,
      isVerified: "",
      lastName: lastname,
      profileImage: imageUrl,
      questions: [],
      uniqueKey: this.utilService.generateUniqueKey(constants.userTypes.tutor),
      userId: userId,
      role: constants.userTypes.tutor,
      subjects: subject,
      subCategory: subCategory,
      phoneNumber: phoneNumber,
      street: street,
      city: city,
      country: country,
      rating: 0,
      totalEarnings: 0,
      tasksCompleted: 0,
      bankName: bankName,
      branchName: branch,
      accountNumber: accountNumber,
      description: description
    }
    return userRef.set(userData, {
      merge: true
    });
  }

  registerATutor(email: string, password: string, firstName: string, imageUrl: string, lastname: string, subCategory: string[], subject: string, phoneNumber: string, street: string, city: string, country: string, visibleName: string, bankName: string, branchName: string, accountNumber: string, description: string) {
    const body = {
      'email': email,
      'password': password,
      'returnSecureToken': true,
    };
    return this.http.post(constants.firebase_create_user_url, body, {}).subscribe(
      (res) => {
        // @ts-ignore
        this.saveTutor(email, res.localId, firstName, imageUrl, lastname, subject, subCategory, phoneNumber, street, city, country, visibleName, bankName, branchName, accountNumber, description).then(() => {
          // this.mailService.ma
        });
        // @ts-ignore
        this.studentService.createEarningSectionForTutor(res.localId).then(() => {
          this.mailService.sendMail("You have an account", email, constants.createTutorMail(firstName, email, password), constants.mailTemplates.createTutor).subscribe()
        });
        this.utilService.openDialog(systemMessages.adminTitles.tutorAddedSuccess, systemMessages.adminMessages.tutorAddedSuccess, constants.messageTypes.success).afterOpened().subscribe()
      }
    );
  }


}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

//Angular material imports
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {ProgressDialogComponent} from './components/shared/progress-dialog/progress-dialog.component';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AdminComponent} from './components/admin/admin.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {ManageTutorsComponent} from './components/admin/manage-tutors/manage-tutors.component';
import {RefundsComponent} from './components/admin/refunds/refunds.component';
import {AdminQuestionComponent} from './components/admin/admin-question/admin-question.component';
import {PaymentsComponent} from './components/admin/payments/payments.component';
import {AuthComponent} from './components/auth/auth.component';
import {MessageDialogComponent} from './components/shared/message-dialog/message-dialog.component';


import {AngularFireModule} from 'angularfire2';
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from 'angularfire2/firestore'
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFireStorageModule} from 'angularfire2/storage';
import { AddTutorComponent } from './components/admin/add-tutor/add-tutor.component';
import { AddQuestionComponent } from './components/shared/add-question/add-question.component';
import { QuestionCardComponent } from './components/shared/question-card/question-card.component';
import { ChatComponent } from './components/shared/chat/chat.component';
import { CountDownComponent } from './components/shared/count-down/count-down.component';
import { CustomDropzonePreviewComponent } from './components/shared/custom-dropzone-preview/custom-dropzone-preview.component'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MessageRequestComponent } from './components/admin/message-request/message-request.component';
import { StudentPaymentDetailedViewComponent } from './components/admin/student-payment-detailed-view/student-payment-detailed-view.component';
import { TutorPaymentsDetailedViewComponent } from './components/admin/tutor-payments-detailed-view/tutor-payments-detailed-view.component';
import { TutorProfileComponent } from './components/admin/tutor-profile/tutor-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    ManageTutorsComponent,
    RefundsComponent,
    AdminQuestionComponent,
    PaymentsComponent,
    AuthComponent,
    ProgressDialogComponent,
    MessageDialogComponent,
    AddTutorComponent,
    AddQuestionComponent,
    QuestionCardComponent,
    ChatComponent,
    CountDownComponent,
    CustomDropzonePreviewComponent,
    MessageRequestComponent,
    StudentPaymentDetailedViewComponent,
    TutorPaymentsDetailedViewComponent,
    TutorProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatExpansionModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxDropzoneModule,
    MatRadioModule
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {AuthComponent} from "./components/auth/auth.component";
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {RefundsComponent} from "./components/admin/refunds/refunds.component";
import {ManageTutorsComponent} from "./components/admin/manage-tutors/manage-tutors.component";
import {PaymentsComponent} from "./components/admin/payments/payments.component";
import {AdminQuestionComponent} from "./components/admin/admin-question/admin-question.component";
import {StudentPaymentDetailedViewComponent} from "./components/admin/student-payment-detailed-view/student-payment-detailed-view.component";
import {TutorPaymentsDetailedViewComponent} from "./components/admin/tutor-payments-detailed-view/tutor-payments-detailed-view.component";
import {ChatComponent} from "./components/shared/chat/chat.component";
import {TutorProfileComponent} from "./components/admin/tutor-profile/tutor-profile.component";

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/signIn']);

const routes: Routes = [
  {path: 'signIn', component: AuthComponent},
  {
    path: '', component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToHome},
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'questions',
        component: AdminQuestionComponent
      },

      {
        path: 'refunds',
        component: RefundsComponent
      },
      {
        path: 'chat/:id',
        component: ChatComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'manage-tutors',
        component: ManageTutorsComponent
      },
      {
        path: 'student-payment',
        component: StudentPaymentDetailedViewComponent
      },
      {
        path: 'tutor-payment',
        component: TutorPaymentsDetailedViewComponent
      },
      {
        path: 'tutor-profile/:id',
        component: TutorProfileComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

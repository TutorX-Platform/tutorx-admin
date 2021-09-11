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

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {path: '', component: AuthComponent},
  {
    path: 'admin', component: AdminComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: {authGuardPipe: redirectUnauthorizedToHome},
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
      // {
      //   path: 'chat/:id',
      //   component: ChatComponent
      // },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'manage-tutors',
        component: ManageTutorsComponent
      },
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
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

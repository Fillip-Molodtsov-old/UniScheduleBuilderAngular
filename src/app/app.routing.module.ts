import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotFoundPageComponent} from "./component/not-found-page/not-found-page.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {SubjectListComponent} from "./component/subject-list/subject-list.component";
import {AppGuard} from "./guard/app.guard";
import { TimetableComponent } from "./component/timetable/timetable.component";
import {SubjectViewComponent} from "./component/subject-view/subject-view.component";
import {SubjectEditorComponent} from "./component/subject-editor/subject-editor.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/timetable',
    pathMatch: 'full'
  },
  {
   path: 'login',
   component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: RegisterComponent
  },
  {
    path: 'subjects',
    component: SubjectListComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'subject-editor',
    component: SubjectEditorComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'subject-editor/:id',
    component: SubjectEditorComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'subject/:id',
    component: SubjectViewComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'timetable',
    component: TimetableComponent,
    canActivate: [AppGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

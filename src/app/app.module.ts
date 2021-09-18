import {NgModule, Provider} from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app.routing.module";
import { LoginComponent } from './component/login/login.component';
import {NotFoundPageComponent} from "./component/not-found-page/not-found-page.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenAppenderInterceptor} from "../auth/token-appender.interceptor";
import { RegisterComponent } from './component/register/register.component';
import { SubjectListComponent } from './component/subject-list/subject-list.component';
import { SubjectEditorComponent } from './component/subject-editor/subject-editor.component';
import { SubjectViewComponent } from './component/subject-view/subject-view.component';
import { SlotEditorComponent } from './component/slot-editor/slot-editor.component';
import { TimetableComponent } from './component/timetable/timetable.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: TokenAppenderInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundPageComponent,
    RegisterComponent,
    SubjectListComponent,
    SubjectEditorComponent,
    SubjectViewComponent,
    SlotEditorComponent,
    TimetableComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }

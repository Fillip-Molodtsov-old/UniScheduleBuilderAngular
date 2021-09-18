import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserAuthFormService} from "../service/user-auth-form.service";
import {ValidationMessages} from "../../shared/model/labels/validation.message";
import {AuthApiService} from "../../api-service/auth-http.service";
import {JwtTokenService} from "../../../auth/jwt-token.service";
import Labels from "../../shared/model/labels/labels.constant";
import {ToasterCustomService} from "../../service/toaster-custom.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup

  usernameErrorMessage = ValidationMessages.username
  passwordErrorMessage = ValidationMessages.password

  subscriptions: Subscription

  constructor(
    private toaster: ToasterCustomService,
    private router: Router,
    private userAuthFormService: UserAuthFormService,
    private authApiService: AuthApiService,
  ) {
    this.subscriptions = new Subscription();
    this.form = this.userAuthFormService.loginForm()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  submit() {
    const {username, password} = this.form.value
    const cred = {username, password}
    const sub = this.authApiService.login(cred)
      .subscribe(
        (res: Response) => {
          const token = res.headers.get('Authorization')
          JwtTokenService.saveToken(token!)
          this.toaster.successfulNotification(Labels.login.success);
          this.router.navigate(['subjects'])
        }, err => {
          this.toaster.errorNotification(Labels.login.error);
        }
      )
    this.subscriptions.add(sub)
  }
}

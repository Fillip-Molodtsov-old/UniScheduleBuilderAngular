import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ValidationMessages} from "../../shared/model/labels/validation.message";
import {Subscription} from "rxjs";
import {ToasterCustomService} from "../../service/toaster-custom.service";
import {Router} from "@angular/router";
import {UserAuthFormService} from "../service/user-auth-form.service";
import {AuthApiService} from "../../api-service/auth-http.service";
import Labels from "../../shared/model/labels/labels.constant";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup

  usernameErrorMessage = ValidationMessages.username
  passwordErrorMessage = ValidationMessages.password
  passwordRepeatErrorMessage = ValidationMessages.passwordDontMatch

  subscriptions: Subscription

  constructor(
    private toaster: ToasterCustomService,
    private router: Router,
    private userAuthFormService: UserAuthFormService,
    private authApiService: AuthApiService,
  ) {
    this.subscriptions = new Subscription();
    this.form = this.userAuthFormService.registerForm()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  submit() {
    const {username, password} = this.form.value
    const cred = {username, password}
    const sub = this.authApiService.requestSignUp(cred)
      .subscribe(
        _ => {
          this.toaster.successfulNotification(Labels.register.success);
          this.router.navigate(['login'])
        }, err => {
          this.toaster.errorNotification(err.error.message);
        }
      )
    this.subscriptions.add(sub)
  }

}

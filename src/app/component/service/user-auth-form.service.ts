import {
  AbstractControl,
  FormBuilder,
  FormGroup, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class UserAuthFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public loginForm()
    : FormGroup {
    return this.formBuilder.group({
      username: username(),
      password: password()
    });
  }

  public registerForm()
    : FormGroup {
    return this.formBuilder.group({
      username: username(),
      password: password(),
      passwordRepeat: password()
    }, { validators: [samePasswordValidator]});
  }

}

const samePasswordValidator :ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value
  const passwordRepeat = control.get('passwordRepeat')?.value
  return passwordDontMatchCheck(password, passwordRepeat)
}

const passwordDontMatchCheck = (password: string, passwordRepeat: string): ValidationErrors | null =>
  password === passwordRepeat ? null : {passwordDontMatch: true}

const passwordRegExp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
const username = (value?: string, disabled = false) => ([{value: value ?? null, disabled}, [Validators.required, Validators.minLength(3)]])
const password = () => ([null, [Validators.required, Validators.pattern(passwordRegExp)]])


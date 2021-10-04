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
export class SubjectEditorFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public subjectForm(body: any)
    : FormGroup {
    return this.formBuilder.group({
      id: [body.id ?? null],
      name: [ body.name ?? null, [Validators.required]],
      lecturer: [body.lecturer ?? null, [Validators.required]],
      practitioner: [body.practitioner ?? null, [Validators.required]],
    });
  }

}

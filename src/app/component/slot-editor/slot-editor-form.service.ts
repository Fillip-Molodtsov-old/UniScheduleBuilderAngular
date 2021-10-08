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
export class SlotEditorFormService {

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public slotForm()
    : FormGroup {
    return this.formBuilder.group({
      day: [null, [Validators.required]],
      time: [ null, [Validators.required]],
      lection: [ false ],
      weeks: [null, [Validators.required]],
      room: [null, [Validators.required]]
    });
  }

}

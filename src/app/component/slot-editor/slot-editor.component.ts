import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api-service/api-service";
import {ToasterCustomService} from "../../service/toaster-custom.service";
import {finalize, switchMap, take} from "rxjs/operators";
import {forkJoin, of} from "rxjs";
import {SlotEditorFormService} from "./slot-editor-form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-slot-editor',
  templateUrl: './slot-editor.component.html',
  styleUrls: ['./slot-editor.component.scss']
})
export class SlotEditorComponent implements OnInit {

  labelRequired = 'Required'

  isLoading = false;
  subjectId: number
  days: any;
  times: any;

  form: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toaster: ToasterCustomService,
    private slotEditorFormService: SlotEditorFormService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(
        switchMap(param => {
          this.subjectId = param.subjectId
          return forkJoin({
            days: this.apiService.getDays(),
            times: this.apiService.getTimeIntervals()
          })
        }),
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe( res => {
        this.days = res.days
        this.times = res.times
        this.form = this.slotEditorFormService.slotForm();
      })
  }

  submit() {
    const value = this.form.value
    value.weeks = transformWeeks(value.weeks)

    this.apiService.createTimeSlot(this.subjectId, value)
      .subscribe( _ => {
        this.toaster.successfulNotification('Slot created')
        this.router.navigate(['/subject', this.subjectId])
      }, err => {
        this.toaster.errorNotification(err)
      })
  }
}

const transformWeeks = (str): number[] => {
  str = str.replace(/ /g,'')
  const strArr = str.split(',')
  let res = [];
  strArr.forEach(el => {
    if(isNaN(el)) {
      res.push(...parseRange(el))
    } else {
      res.push(parseInt(el, 10))
    }
  })
  return res
}

const parseRange = str => {
  const arr = str.split('-')
  let res = []
  for(let i = parseInt(arr[0], 10); i<= parseInt(arr[1], 10); i++) {
    res.push(i)
  }
  return res
}

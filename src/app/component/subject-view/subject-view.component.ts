import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../api-service/api-service";
import {ToasterCustomService} from "../../service/toaster-custom.service";
import {finalize, switchMap, take} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.scss']
})
export class SubjectViewComponent implements OnInit {

  isLoading = false;
  subjectId: number;
  subjectInfo: any;

  displayedColumns: string[] = ['day', 'time', 'weeks', 'lection', 'room', 'action']
  dataSource: any[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toaster: ToasterCustomService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(
        switchMap(param =>{
          const id = param.id
          this.subjectId = id
          return this.apiService.getSubjectInfo(id)
        }),
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe(subjectInfo =>{
        subjectInfo.slots.forEach( s => {
          s.day =  s.day.value
          s.time = s.time.value
          s.weeks = s.subjectSlots.map( slot => slot.week)
        })
        this.subjectInfo = subjectInfo;
        this.dataSource = subjectInfo.slots;
      })
  }

  deleteSlot(id : number) {
    this.apiService.deleteSlot(id).subscribe(_ => {
      this.toaster.successfulNotification("Slot deleted successfully")
      this.ngOnInit()
    }, err => {
      this.toaster.errorNotification(err)
    })
  }
}


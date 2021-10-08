import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../api-service/api-service";
import {ToasterCustomService} from "../../service/toaster-custom.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  isLoading = false;
  timetable: any[]
  week: number = 1

  displayedColumns: string[] = ['time', 'subject', 'teacher', 'group', 'room']

  constructor(
    private apiService: ApiService,
    private toaster: ToasterCustomService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getTimetable(this.week)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe( data => {
        this.timetable = data;
      }, err => {
        this.toaster.errorNotification(err.error.message)
      })
  }

  weekChange() {
    this.ngOnInit()
  }

  isTimeTableEmpty(): boolean {
    let count = 0
    this.timetable.forEach(d => {
       if(d.slots.length !== 0) count = count + 1;
    })
    return  count === 0
  }
}

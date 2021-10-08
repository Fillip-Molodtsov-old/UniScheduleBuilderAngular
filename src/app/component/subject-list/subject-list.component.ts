import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api-service/api-service";
import {ToasterCustomService} from "../../service/toaster-custom.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lecturer', 'practitioner', 'action']
  dataSource: any[]

  constructor(
    private apiService: ApiService,
    private toaster: ToasterCustomService,
  ) {}

  ngOnInit(): void {
    this.apiService.getAllSubjects().subscribe(res => {
      this.dataSource = res;
    })
  }

  deleteSubject(id: number) {
    this.apiService.deleteSubject(id)
      .pipe(
        switchMap(r => {
          this.toaster.successfulNotification("Subject deleted successfully")
          return this.apiService.getAllSubjects()
        })
      )
      .subscribe(res => {
        this.dataSource = res;
    }, err => this.toaster.errorNotification(err));
  }

  clearAll() {
    this.apiService.clearApp().subscribe(_ => {
      this.toaster.successfulNotification("Cleared app successfully");
      this.ngOnInit()
    }, err => {
      this.toaster.errorNotification(err)
    })
  }
}

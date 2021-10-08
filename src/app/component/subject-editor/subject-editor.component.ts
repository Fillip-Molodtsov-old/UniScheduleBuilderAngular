import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterCustomService} from "../../service/toaster-custom.service";
import {ApiService} from "../../api-service/api-service";
import {finalize, switchMap, take} from "rxjs/operators";
import {of} from "rxjs";
import {SubjectEditorFormService} from "./subject-editor-form.service";

@Component({
  selector: 'app-subject-editor',
  templateUrl: './subject-editor.component.html',
  styleUrls: ['./subject-editor.component.scss']
})
export class SubjectEditorComponent implements OnInit {

  form: FormGroup;
  labelRequired = 'Required'
  isEditing = false
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toaster: ToasterCustomService,
    private subjectEditorFormService: SubjectEditorFormService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(
        switchMap(param =>{
          const id = param.id
          if(!id)  return of({})
          this.isEditing = true
          return this.apiService.getSubject(id)
        }),
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe(subject =>{
        this.form = this.subjectEditorFormService.subjectForm(subject)
      })
  }

  submit() {
    const value = this.form.value;
    let fun = this.isEditing ? this.apiService.editSubject(value) : this.apiService.createSubject(value)

    fun.subscribe( _=> {
      this.toaster.successfulNotification("Changes submitted")
      this.router.navigate(['/subjects'])
    }, err => {
      this.toaster.errorNotification(err)
    })
  }
}

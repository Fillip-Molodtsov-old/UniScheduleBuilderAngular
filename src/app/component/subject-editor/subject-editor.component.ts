import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToasterCustomService} from "../../service/toaster-custom.service";

@Component({
  selector: 'app-subject-editor',
  templateUrl: './subject-editor.component.html',
  styleUrls: ['./subject-editor.component.scss']
})
export class SubjectEditorComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ToasterCustomService,
    private toaster: ToasterCustomService,
  ) { }

  ngOnInit(): void {
  }

}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {LoginCredentials} from "../shared/model/credentials.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL: string;
  private SUB_URL: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.URL = `${environment.url}`
    this.SUB_URL = `${this.URL}/api/v1/sub`
  }

  createSubject(body: any): Observable<any> {
    return this.httpClient.post(this.SUB_URL, body)
  }

  editSubject(body: any): Observable<any> {
    return this.httpClient.put(this.SUB_URL, body)
  }

  getSubject(id: number): Observable<any> {
    return this.httpClient.get(`${this.SUB_URL}/${id}`)
  }

  getAllSubjects(): Observable<any> {
    return this.httpClient.get(`${this.SUB_URL}/all`)
  }

  deleteSubject(id: number): Observable<any> {
    return this.httpClient.delete(`${this.SUB_URL}/${id}`)
  }

  getTimeIntervals(): Observable<any> {
    return this.httpClient.get(`${this.SUB_URL}/time-intervals`)
  }

  getDays(): Observable<any> {
    return this.httpClient.get(`${this.SUB_URL}/days`)
  }

  createTimeSlot(subjectId: number, body: any): Observable<any> {
    return this.httpClient.post(`${this.SUB_URL}/${subjectId}/slot`, body)
  }

  updateTimeSlot(subjectId: number, body: any): Observable<any> {
    return this.httpClient.put(`${this.SUB_URL}/${subjectId}/slot`, body)
  }

  getTimeSlot(subjectId: number, id:number): Observable<any> {
    return this.httpClient.get(`${this.SUB_URL}/${subjectId}/slot/${id}`)
  }

  deleteSlot(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/api/v1/slot/${id}`)
  }

  getSubjectInfo(id: number): Observable<any> {
    return this.httpClient.get(`${this.SUB_URL}/${id}/full`)
  }

  getTimetable(week: number): Observable<any> {
    return this.httpClient.get(`${this.URL}/api/v1/app/timetable?query=${week}`)
  }

  clearApp(): Observable<any> {
    return this.httpClient.post(`${this.URL}/api/v1/app/clear`, {})
  }
}

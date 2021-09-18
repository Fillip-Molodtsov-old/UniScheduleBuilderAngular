import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {LoginCredentials} from "../shared/model/credentials.model";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private URL: string;
  private PUBLIC_USER_URL: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.URL = `${environment.url}`
    this.PUBLIC_USER_URL = `${this.URL}/api/v1/public/user`
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.httpClient.post(`${this.URL}/login`, credentials, {observe: 'response'})
  }

  requestSignUp(signUpCreds: LoginCredentials): Observable<any> {
    return this.httpClient.post(`${this.PUBLIC_USER_URL}/sign-up`, signUpCreds)
  }

}

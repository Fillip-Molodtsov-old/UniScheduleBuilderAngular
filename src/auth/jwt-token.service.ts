import {Injectable} from "@angular/core";
import jwtDecode, {JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  private static keyName = 'auth-token';

  constructor(
  ) {
  }

  static saveToken(token: string) {
    const pureToken = token.substring(7, token.length)
    this.setToken(pureToken)
  }

  static  deleteToken() {
    this.removeToken()
  }

  static get isExpired(): boolean {
    const exp = this.payload?.exp

    return exp ? ( Date.now() >= exp * 1000) : true;
  }

  static get payload() : any | null {
    const token = JwtTokenService.getToken()
    return token ? JwtTokenService.decodeToken(token) : null;
  }

  private static setToken(token: string) {
    sessionStorage.setItem(JwtTokenService.keyName, token)
  }

  static getToken() : string | null {
    return sessionStorage.getItem(JwtTokenService.keyName)
  }

  private static removeToken() {
    sessionStorage.removeItem(JwtTokenService.keyName)
  }

  private static decodeToken(token: string) : JwtPayload | null {
    try{
      return jwtDecode<JwtPayload>(token);
    }
    catch(Error){
      console.log(Error)
      return null;
    }
  }

}

import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {JwtTokenService} from "../../auth/jwt-token.service";

@Injectable({providedIn: 'root'})
export class AppGuard implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (JwtTokenService.getToken() !== null) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}

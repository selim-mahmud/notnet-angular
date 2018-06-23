import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../models/user";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { AlertifyService } from "../services/alertify.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { AuthService } from "../services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(
        private userService: UserService,
        private router: Router,
        private alertifyService: AlertifyService,
        private authservice: AuthService
    ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{

        return this.userService.getUser(this.authservice.decodedToken.nameid)
                .catch(error => {
                    this.alertifyService.error('Problem retrieving data');
                    this.router.navigate(['/home']);
                    return Observable.of(null);
                })
    }
}
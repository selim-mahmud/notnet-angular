import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../models/user";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { AlertifyService } from "../services/alertify.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberListResolver implements Resolve<User[]>{

    constructor(
        private userService: UserService,
        private router: Router,
        private alertifyService: AlertifyService
    ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userService.getUsers()
                .catch(error => {
                    this.alertifyService.error('Problem retrieving data');
                    this.router.navigate(['/home']);
                    return Observable.of(null);
                })
    }
}
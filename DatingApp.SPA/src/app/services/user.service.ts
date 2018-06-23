import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { User } from "../models/user";

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get(this.baseUrl + "users", this.getRequestOptions())
      .map(response => <User[]>response)
      .catch(this.handleError);
  }

  getUser(id): Observable<User>{
    return this.httpClient.get(this.baseUrl + 'users/' + id, this.getRequestOptions())
    .map(response => <User>response)
    .catch(this.handleError);
  }

  private getRequestOptions() {
    let token = localStorage.getItem("token");
    return {
      headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        })
    };
  }

  private handleError(error: any) {
    const applicationError = error.headers.get("Application-Error");

    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.error;
    let modelStateErrors = "";
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + "\n";
        }
      }
    }

    return Observable.throw(modelStateErrors || "Server error");
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

    baseUrl = 'http://localhost:5000/api/auth';
    userToken: any;

    constructor(private httpClient: HttpClient) { }

    login(model: any){
        

        return this.httpClient.post(this.baseUrl + '/login', model, this.getRequestOptions()).map((response)  => {
            const user = response;

            if(user){
                localStorage.setItem('token', user.tokenString)
                this.userToken = user.tokenString;
            }
        }).catch(this.handleError);
    }

    register(model: any){
        return this.httpClient.post(this.baseUrl + '/register', model, this.getRequestOptions()).catch(this.handleError);
    }

    private getRequestOptions(){
        const headers = {
            headers : new HttpHeaders({'Content-type' : 'application/json'})
        };

        return headers;
    }

    private handleError(error: any){
        const applicationError = error.headers.get('Application-Error');

        if(applicationError){
            return Observable.throw(applicationError);
        }

        const serverError = error.error;
        let modelStateErrors = '';
        if(serverError){
            for(const key in serverError){
                if(serverError[key]){
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }

        return Observable.throw(modelStateErrors || 'Server error');
    }

}

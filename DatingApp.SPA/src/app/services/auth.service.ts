import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

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
        });
    }

    register(model: any){
        return this.httpClient.post(this.baseUrl + '/register', model, this.getRequestOptions());
    }

    private getRequestOptions(){
        const headers = {
            headers : new HttpHeaders({'Content-type' : 'application/json'})
        };

        return headers;
    }

}

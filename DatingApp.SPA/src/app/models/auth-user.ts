import { Injectable } from "@angular/core";

@Injectable()
export class AuthUser {
  tokenString: string = "";

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { JwtHelper } from "angular2-jwt";
declare var $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    $(document).foundation();

    const token = localStorage.getItem("token");
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}

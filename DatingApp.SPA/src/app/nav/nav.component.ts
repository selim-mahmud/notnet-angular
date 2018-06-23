import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AlertifyService } from "../services/alertify.service";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    $('body').foundation();

  }

  login() {
    this.authService.login(this.model).subscribe(
      data => {
        this.alertify.success("logged in successfully");
      },
      error => {
        this.alertify.error("Failed to login");
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem("token");
    this.alertify.message("logged out");
    this.router.navigate(["/home"]);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}

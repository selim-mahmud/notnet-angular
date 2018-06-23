import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AlertifyService } from "../../services/alertify.service";
import { User } from "../../models/user";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"]
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }
}

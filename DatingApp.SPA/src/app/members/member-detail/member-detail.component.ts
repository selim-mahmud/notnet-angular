import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
declare var $: any;

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})

export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    $(document).foundation();
    this.loadUder();
  }

  loadUder(){
    this.userService.getUser(this.route.snapshot.params['id'])
      .subscribe((user: User) => {
        this.user = user;
      }, error => {
        this.alertifyService.error(error);
      })
  }

}

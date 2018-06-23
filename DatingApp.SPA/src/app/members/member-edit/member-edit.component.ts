import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../services/alertify.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
declare var $: any;

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    $(document).foundation();
    this.route.data.subscribe(data => {
      this.user = data['user']
    });
  }

  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertifyService.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    });
    
  }

}

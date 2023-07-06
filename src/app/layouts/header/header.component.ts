import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  statusWindow: boolean = false;
  statusLogin: boolean = false;
  constructor(private userInfo: GetValueLocalService, private router: Router,) { }

  ngOnInit(): void {
    this.user = this.userInfo.getValueLocalUser('user');
    if (this.user) {
      this.statusLogin = true;
    }
  }

  closeMenuRes(element: HTMLElement) {
    console.log(element);
    element.removeAttribute("checked");
  }


  // LogOut
  logOut() {
    this.router.navigate(['login']);
    localStorage.clear();
    this.statusLogin = false;
    this.ngOnInit();
  }
}

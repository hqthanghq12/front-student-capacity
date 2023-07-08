import { Component, OnInit ,Renderer2, ElementRef  } from '@angular/core';
import { User } from 'src/app/models/user';
import { GetValueLocalService } from 'src/app/services/get-value-local.service';
import {Router} from '@angular/router';
import { PageStateServiceService } from 'src/app/services/page-state-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  statusWindow: boolean = false;
  statusLogin: boolean = false;
  isExamPage: boolean ;
  constructor(private userInfo: GetValueLocalService, private router: Router,private pageStateService: PageStateServiceService,  private renderer: Renderer2, private el: ElementRef) { }
  ngOnInit(): void {
    localStorage.setItem('status',JSON.stringify(false));
    let status = JSON.parse(localStorage.getItem('status')!);
    this.isExamPage = status;
    
    this.user = this.userInfo.getValueLocalUser('user');
    if (this.user) {
      this.statusLogin = true;
    }
  }


  closeMenuRes(element: HTMLElement) {
    console.log(element);
    element.removeAttribute("checked");
  }

  preventDefault(event: MouseEvent): void {
    event.preventDefault();
  }


  // LogOut
  logOut() {
    this.router.navigate(['trang-chu']);
    setTimeout(() => {
      localStorage.clear();
      this.statusLogin = false;
      this.ngOnInit();
      window.location.reload()
    },1000)
   
  
  }
}

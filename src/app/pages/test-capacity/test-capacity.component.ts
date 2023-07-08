import {Component, OnInit} from '@angular/core';
import {Capacity} from 'src/app/models/capacity';
import {TestCapacityService} from 'src/app/services/test-capacity.service';
import { Semeter } from 'src/app/models/semeter.model';
import { SemeterService } from 'src/app/services/semeter.service';
import {UserService} from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-test-capacity',
  templateUrl: './test-capacity.component.html',
  styleUrls: ['./test-capacity.component.css']
})
export class TestCapacityComponent implements OnInit {
  listCapacity: Capacity[]
  ListSemeter : Semeter[]
  id_campus : number
  // fakeTag: any = [
  //   {id: 1, name: "Javascript"},
  // ]
  statusUser : boolean= false;
  constructor(
    private testCapacityService: TestCapacityService,
    private semeterService: SemeterService,
    private userService: UserService,
  ) {
    this.getListTestCapacity();
  }

  ngOnInit(): void {
    const userLogged = this.userService.getUserValue();
    this.id_campus =  userLogged.campus_id
    if (!userLogged.id) {
      this.statusUser = false;
      return;
    }
    this.statusUser = true;
  }

  getListTestCapacity() {
    const userLogged = this.userService.getUserValue();
    console.log(userLogged.campus_id);
    
    this.testCapacityService.getAllTestCapacity().subscribe(data => {
      this.listCapacity = data.payload.data;
    })
    this.semeterService.getAllSemeter(userLogged.campus_id).subscribe(data => {
      this.ListSemeter = data.payload;
      console.log(data.payload);
      
    })
  }

}

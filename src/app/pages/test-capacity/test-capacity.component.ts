import {Component, OnInit} from '@angular/core';
import {Capacity} from 'src/app/models/capacity';
import {TestCapacityService} from 'src/app/services/test-capacity.service';
import { Semeter } from 'src/app/models/semeter.model';
import { SemeterService } from 'src/app/services/semeter.service';
@Component({
  selector: 'app-test-capacity',
  templateUrl: './test-capacity.component.html',
  styleUrls: ['./test-capacity.component.css']
})
export class TestCapacityComponent implements OnInit {
  listCapacity: Capacity[]
  ListSemeter : Semeter[]
  // fakeTag: any = [
  //   {id: 1, name: "Javascript"},
  // ]

  constructor(
    private testCapacityService: TestCapacityService,
    private semeterService: SemeterService
  ) {
    this.getListTestCapacity();
  }

  ngOnInit(): void {
  }

  getListTestCapacity() {
    this.testCapacityService.getAllTestCapacity().subscribe(data => {
      this.listCapacity = data.payload.data;
    })
    this.semeterService.getAllSemeter().subscribe(data => {
      this.ListSemeter = data.payload.data;
      console.log(this.ListSemeter);
      
    })
  }

}

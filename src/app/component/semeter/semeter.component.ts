import {Router} from '@angular/router';
import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import { Semeter } from 'src/app/models/semeter.model';

@Component({
  selector: 'app-semeter',
  templateUrl: './semeter.component.html',
  styleUrls: ['./semeter.component.css']
})
export class SemeterComponent implements OnInit {
  @Input() SemeterItem!: Semeter;
  constructor(
    private Router : Router,
  ) { }

  ngOnInit(): void {
  }

  handleGotoPoetry(id_poetry : number){
      this.Router.navigate(['/ca-thi', id_poetry]);
  }

}

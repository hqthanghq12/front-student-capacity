import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoetryService } from 'src/app/services/poetry.service';
import { Poetry } from 'src/app/models/poetry.model';
import { User } from 'src/app/models/user';
import {UserService} from 'src/app/services/user.service';
@Component({
  selector: 'app-poetry',
  templateUrl: './poetry.component.html',
  styleUrls: ['./poetry.component.css']
})
export class PoetryComponent implements OnInit {
  listpoetry : Poetry[]
  nameSemeter : string;
  idPoetry : number;
  stringifiedData: any;  
  user : any
  isFetchingCapacity = false;
  statusUser : boolean= false;
  statusExam : boolean= false;
  constructor(
    private PoetryService :PoetryService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { poetry_id } =  params;
      this.idPoetry  = poetry_id;
      const userLogged = this.userService.getUserValue();
      console.log(userLogged);
      
      if (!userLogged.id) {
        this.statusUser = false;
        return;
      }
      this.user = userLogged;
      this.statusUser = true;
      this.PoetryService.getAllPoetry(poetry_id,userLogged.id).subscribe(res => {
        if(res.status){
          this.listpoetry = res.payload.data;
          this.nameSemeter = res.payload.name_item;
          this.statusExam = true;
          this.isFetchingCapacity = false;
         
        }
    })

    
    })
  }

  
 

}

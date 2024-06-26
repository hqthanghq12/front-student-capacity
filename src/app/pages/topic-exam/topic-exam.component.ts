import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playtopic } from 'src/app/models/playtopic.model';
import { PlaytopicServiceService } from 'src/app/services/playtopic-service.service';
@Component({
  selector: 'app-topic-exam',
  templateUrl: './topic-exam.component.html',
  styleUrls: ['./topic-exam.component.css']
})
export class TopicExamComponent implements OnInit {
  ListExam : Playtopic[]
  isFetchingCapacity = false;
  constructor(
    private PlaytopicServiceService : PlaytopicServiceService,
    private router : ActivatedRoute
  ) { 
    this.Topics()
  }

  ngOnInit(): void {
  }

  Topics(){
    this.router.params.subscribe(params => {
      const {id_user,id_poetry,id_campus,id_subject} =  params;
      
      this.PlaytopicServiceService.getAllTopics(id_user,id_poetry,id_campus,id_subject).subscribe(res => {
          if(res.status){
            this.ListExam = res.payload.data
          }
        
      })
    })

  }

}

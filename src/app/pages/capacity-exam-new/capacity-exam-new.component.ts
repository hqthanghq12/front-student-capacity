import {DialogConfirmComponent} from './../../modal/dialog-confirm/dialog-confirm.component';
import {NgToastService} from 'ng-angular-popup';
import {RoundService} from 'src/app/services/round.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap,forkJoin } from 'rxjs';
import {Round} from 'src/app/models/round.model';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from 'src/app/services/user.service';
import { Playtopic } from 'src/app/models/playtopic.model';
import { PlaytopicServiceService } from 'src/app/services/playtopic-service.service';
import { ResultCapacityService } from 'src/app/services/result-capacity.service';
import { MathContent } from 'src/app/math/math-content';
@Component({
  selector: 'app-capacity-exam-new',
  templateUrl: './capacity-exam-new.component.html',
  styleUrls: ['./capacity-exam-new.component.css']
})
export class CapacityExamNewComponent implements OnInit {

  @ViewChildren("questions") questions: QueryList<ElementRef>;
  Exam : any;
  formAnswers!: FormGroup;
  data: any;
  idExam : number;
  fakeQuestionData!: any;
  checkUserExam = false;

  // DS id câu hỏi đã trả lời
  questionListId: { questionId: number }[] = [];
  round_id: number;
  isTakingExam = false;
  roundDetail!: Round;
  DataPoetry : any;
  statusExam : boolean= false;
  isFetchingRound = false;
  countDownTimeExam: { minutes: number | string, seconds: number | string } = {
    minutes: "00",
    seconds: "00"
  }
  // thông báo sắp hết giờ
  isNotiExamTimeOut = false;

  constructor(
    private roundService: RoundService,
    private resultExam : ResultCapacityService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private toast: NgToastService,
    private router: Router,
    private PlaytopicServiceService : PlaytopicServiceService,
  ) {
  
  }

  ngOnInit(): void {
    this.isFetchingRound = true;
    this.route.params.subscribe(params => {
      const {id_user,id_poetry,id_campus,id_subject} =  params;
      this.PlaytopicServiceService.getAllTopics(id_user,id_poetry,id_campus,id_subject).subscribe(resExam => {
        
        if(Object.keys(resExam.payload).length > 0){
            this.Exam = resExam.payload
            this.idExam = this.Exam.id_exam;
            this.statusExam = true;
            forkJoin([
              this.resultExam.ResultExam(id_user,this.Exam.id_exam),
              this.roundService.getExamsWhereId(this.Exam.id_exam),
              // this.roundService.getpoetryOnesWhereId(id_poetry)
            ]).subscribe(([resEXam,resExams ]) => {
              // resPoetry
              if(resEXam.payload == null){
                // console.log(resEXam);
                this.isFetchingRound = false;
                this.checkUserExam = true;
              }
              if (resExams.status) {
                this.isFetchingRound = false;
                this.roundDetail = resExams.payload;
                this.roundDetail.start_time = new Date("2022-06-25 15:25:54");
                this.round_id = resExams.payload.id;
             
              }
              // this.DataPoetry = resPoetry.payload;
              // console.log(resPoetry.payload);
              
              // console.log(this.DataPoetry);
            });
          }
      })
    })
  }

  mathMl: MathContent = {
    mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mover>
      <munder>
        <mo>∫</mo>
        <mn>0</mn>
      </munder>
      <mi>∞</mi>
    </mover>
    <mtext> versus </mtext>
    <munderover>
      <mo>∫</mo>
      <mn>0</mn>
      <mi>∞</mi>
    </munderover>
  </mrow>
</math>`
  };


  // làm bài
  handleTakeExam() {
    const confimExamRef = this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: {
        title: "Lưu ý",
        description: "Bài làm sẽ được nộp tự động sau khi hết thời gian, không thoát toàn màn hình trong quá trình làm bài!",
        textCancel: "Thoát",
        textOk: "Đồng ý"
      }
    });

    confimExamRef.afterClosed().subscribe(res => {
      if (res === "true") {
        // check user logged
        const userLogged = this.userService.getUserValue();
        if (!userLogged.id) {
          this.toast.warning({summary: "Vui lòng đăng nhập trước khi làm bài", duration: 3000});
          this.router.navigate(['/login']);
          return;
        }

        // check thời gian thi
        const todayTime = new Date().getTime();
        const timeStart = new Date(this.roundDetail.start_time).getTime();

        if (todayTime < timeStart) {
          this.toast.warning({summary: "Chưa đến thời gian làm bài"});
          return;
        }
        
        
        // this.roundService.getInfoCapacityExam(this.Exam.id_exam).subscribe(res => {
        //   if (res.status) {
        //     console.log(res);
        //     if (res.status) {
        //       this.data = res.payload;
  
        //       this.isTakingExam = true;
  
        //       this.fakeQuestionData = this.data.questions;
        //       this.createFormControl();
        //       const durationExam = this.roundDetail.time_type_exam == 1 ? (this.data.time * 60 * 60) : this.data.time * 60;
        //       console.log(res.payload);
              
        //       this.handleStartExam(durationExam, this.data.created_at);
        //       console.log(res.payload);
  
        //     }
        //   }
        // })

        // fake api tạo bản nháp
        console.log(this.idExam);
        
        this.roundService.getInfoCapacityExam(this.idExam).subscribe(res => {
          // console.log(res);
          if (res.status) {
            this.data = res.payload;

            this.isTakingExam = true;
            this.fakeQuestionData = this.data.questions;
            this.createFormControl();
            const durationExam = this.roundDetail.time_type_exam == 1 ? (this.data.time * 60 * 60) : this.data.time * 60;
            const regex = /\[anh\d*\]/g;
         
            console.log(this.data);
            // for (const question of this.data.questions) {
            //   const result = question.content.match(regex);
            //   if (result) {
            //     const cleanedMatches = result.map((match:string) => match.replace(/\[|\]/g, ''));
            //     const nameImg = cleanedMatches[0];
            //     for (const imgs of this.data.images) {
            //       if(imgs.img_code == nameImg){

            //       }
            //     }
            //   } else {
            //     console.log("Không tìm thấy chuỗi chứa '[anh]'");
            //   }
            // }
            
            this.handleStartExam(durationExam, this.data.created_at);
           

          }
        });
      }
    })
  }

  // nộp bài
  handleSubmitExam() {
    // check làm thiếu câu hỏi
    if (this.formAnswers.valid) {
      const answersData = this.getAnswersData();

      const confirmSubmitExam = this.dialog.open(DialogConfirmComponent, {
        disableClose: true,
        width: "350px",
        data: {
          title: "Xác nhận nộp bài",
          description: "Bạn có chắc chắn muốn nộp bài?",
          textCancel: "Thoát",
          textOk: "Đồng ý"
        }
      });

      confirmSubmitExam.afterClosed().subscribe(result => {
        // xác nhận nộp bài
        if (result === "true") {
          // this.openDialogSubmitExam();
          this.handleSubmitExamPost();
        }
      })
    } else {
      const listQuesNum = this.getFormValidationErrors();

      const confirmSubmitExam = this.dialog.open(DialogConfirmComponent, {
        disableClose: true,
        width: "350px",
        data: {
          title: "Xác nhận nộp bài",
          description: `Bạn chưa hoàn thành các câu: ${listQuesNum.join(", ")}`,
          textCancel: "Tiếp tục",
          textOk: "Nộp bài"
        }
      });

      confirmSubmitExam.afterClosed().subscribe(result => {
        console.log(result);
        
        // xác nhận nộp bài
        if (result === "true") {
          // this.openDialogSubmitExam();
          this.handleSubmitExamPost();
        }
      })
    }
  }

  getAnswersData() {
    const answerFormData = this.formAnswers.value;

    // danh sách id câu hỏi và câu trả lời
    const answersData: { questionId: number, type: number, answerId: number }[] = [];
    for (const key in answerFormData) {
      // const questionId = key.split("-")[2];
      const [, , questionId, questionType] = key.split("-");

      answersData.push({
        questionId: +questionId,
        type: Number(questionType),
        answerId: answerFormData[key]
      })
    }

    return answersData;
  }

  createFormControl() {
    const ctrls: { [name: string]: FormControl } = {};
    this.fakeQuestionData.forEach((question: any, index: number) => {
      const fieldName = `question-${++index}-${question.id}-${question.type}`;
      ctrls[fieldName] = new FormControl('', Validators.required)
    })

    this.formAnswers = new FormGroup(ctrls);
  }

  // lấy danh sách câu hỏi chưa trả lời
  getFormValidationErrors() {
    const listQuestionNum: number[] = [];
    Object.keys(this.formAnswers.controls).forEach(key => {
      const controlErrors: any = this.formAnswers.get(key)?.errors;

      if (controlErrors != null) {
        const questionNum = key.split("-")[1];
        listQuestionNum.push(+questionNum);
      }
    });

    return listQuestionNum;
  }

  // lưu các câu hỏi đã trả lời
  handleChooseAnswer(questionId: number) {
    const exitsId = this.questionListId.some(item => item.questionId === questionId);

    // nếu trong chưa có questionId
    if (!exitsId) {
      this.questionListId.push({
        questionId
      });
    }
  }

  // check câu hỏi đã làm
  checkQuesAnswered(questionId: number) {
    const isAnswerd = this.questionListId.some(item => item.questionId === questionId);

    return isAnswerd;
  }

  // scroll khi click câu hỏi
  scrollToQuestion(indexQuestion: number) {
    this.questions.forEach((questionRef, index) => {
      if (indexQuestion === index) {
        questionRef.nativeElement.scrollIntoView();
      }
    })
  }

  // bắt đầu làm bài
  handleStartExam(duration: number, timeStart: any) {
    // tính thời gian làm bài ban đầu
    const minutesExam = Math.floor(((duration % (60 * 60 * 24)) % (60 * 60)) / 60);
    const secondsExam = Math.floor(((duration % (60 * 60 * 24)) % (60 * 60)) % 60);
    // console.log(minutesExam, secondsExam);
    this.countDownTimeExam.minutes = minutesExam;
    this.countDownTimeExam.seconds = secondsExam;

    // let timeStartExam: any = new Date(timeStart).getTime();
    let timeStartExam: any = new Date().getTime();
    // console.log(timeStartExam);
    const timeWillEndExam = new Date(timeStartExam + duration * 1000 + 1000);
    // console.log(timeWillEndExam);

    let timerId: any;
    let futureDate = new Date(timeWillEndExam).getTime();
    // console.log(futureDate);
    timerId = setInterval(() => {
      let today = new Date().getTime();

      let distance = futureDate - today;

      if (distance < 0) {
        this.countDownTimeExam.minutes = "00";
        this.countDownTimeExam.seconds = "00";
        clearInterval(timerId);

        // thông báo nộp bài khi hết thời gian
        this.dialog.closeAll();

        const submitExamRef = this.dialog.open(DialogConfirmComponent, {
          disableClose: true,
          width: "450px",
          data: {
            title: "Hết giờ làm bài",
            description: "Thời gian làm bài của bạn đã hết!. Chúng tôi sẽ nộp kết quả đã lưu vào trước đó của bạn. Ấn nút để nộp bài!",
            isNotShowBtnCancel: true,
            textOk: "Nộp bài"
          }
        });

        submitExamRef.afterClosed().subscribe(result => {
          if (result === "true") {
            // this.openDialogSubmitExam();
            this.handleSubmitExamPost();
          }
        })
      } else {
        const minutes: string | number = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
        this.countDownTimeExam.minutes = minutes < 10 ? `0${minutes}` : minutes;

        const seconds: number | string = Math.floor((distance % (60 * 1000)) / 1000);
        this.countDownTimeExam.seconds = seconds < 10 ? `0${seconds}` : seconds;

        // thông báo sắp hết giờ
        if (minutes <= 1 && !this.isNotiExamTimeOut) {
          this.toast.warning({summary: "Sắp hết thời gian làm bài, hãy kiểm tra lại bài làm của bạn", duration: 10000});
          this.isNotiExamTimeOut = true;
        }
      }

      // console.log(this.countDownTimeExam.minutes, this.countDownTimeExam.seconds)
    }, 1000);
  }

  openDialogSubmitExam() {
    this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      disableClose: true,
      data: {
        description: "Vui lòng không thoát ứng dụng. Hệ thống sẽ tự động chuyển đến trang kết quả sau khi nộp bài thành công.",
        isNotShowBtn: true,
        title: "Đang nộp bài...",
        isShowLoading: true
      }
    })

  }

  getResultExam() {
    const data = this.getAnswersData();
    return {
      exam_id: this.data.id,
      data,
    }
  }


  handleSubmitExamPost() {
    this.openDialogSubmitExam();
    this.roundService.submitExam(this.getResultExam()).subscribe(res => {
      console.log(res);
      this.dialog.closeAll();
     
       this.route.params.subscribe(params => {
      const  {id_user,id_poetry,id_campus,id_subject,id_semeter} =  params;
      if(res.status){
        this.dialog.open(DialogConfirmComponent, {
          width: '500px',
          disableClose: true,
          data: {
            description: "Nộp bài thành công",
            isNotShowBtn: false,
            title: "Bấm ok để hoàn tác quá trình nộp bài",
            isShowLoading: false,
          }
        })
      this.router.navigate(['/ca-thi', id_semeter]);
      }
     
      
    })

    })
  }

}
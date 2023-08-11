import {DialogConfirmComponent} from './../../modal/dialog-confirm/dialog-confirm.component';
import {NgToastService} from 'ng-angular-popup';
import {RoundService} from 'src/app/services/round.service';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {
  Component,
  Renderer2,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  Inject,
  HostListener,
  OnDestroy
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, forkJoin} from 'rxjs';
import {Round} from 'src/app/models/round.model';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from 'src/app/services/user.service';
import {Playtopic} from 'src/app/models/playtopic.model';
import {PlaytopicServiceService} from 'src/app/services/playtopic-service.service';
import {ResultCapacityService} from 'src/app/services/result-capacity.service';
import {MathContent} from 'src/app/math/math-content';
import {DOCUMENT, Time} from '@angular/common';

declare const MathJax: any;

@Component({
  selector: 'app-capacity-exam-new',
  templateUrl: './capacity-exam-new.component.html',
  styleUrls: ['./capacity-exam-new.component.css']
})
export class CapacityExamNewComponent implements OnInit, OnDestroy {

  @ViewChildren("questions") questions: QueryList<ElementRef>;
  Exam: any;
  formAnswers!: FormGroup;
  data: any;
  idExam: number;
  fakeQuestionData!: any;
  checkUserExam = false;
  docElement: HTMLElement;
  isExamPage: boolean;
  // DS id câu hỏi đã trả lời
  questionListId: { questionId: number }[] = [];
  round_id: number;
  isTakingExam = false;
  roundDetail!: Round;
  DataPoetry: any;
  DataPlayTopic: any;
  statusExam: boolean = false;
  isFetchingRound = false;
  // trạng thái đang call api nộp bài
  isSubmitingExam = false;
  // trạng thái hết giờ làm bài
  isTimeOut = false;
  // kích thước màn hình
  windowScreenSize!: { width: number; height: number };
  countDownTimeExam: { minutes: number | string, seconds: number | string } = {
    minutes: "00",
    seconds: "00"
  }

  timerId: any;

  // thông báo sắp hết giờ
  isNotiExamTimeOut = false;
  isFullScreen: boolean = false;

  constructor(
    private roundService: RoundService,
    private resultExam: ResultCapacityService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private toast: NgToastService,
    private router: Router,
    private PlaytopicServiceService: PlaytopicServiceService,
    @Inject(DOCUMENT) private document: any,
    private elementRef: ElementRef
  ) {


  }

  ngOnInit(): void {

    this.docElement = document.documentElement;
    this.isFetchingRound = true;
    this.route.params.subscribe(params => {
      const {id_user, id_poetry, id_campus, id_subject} = params;
      this.PlaytopicServiceService.getAllTopics(id_user, id_poetry, id_campus, id_subject).subscribe(resExam => {

        if (Object.keys(resExam.payload).length > 0) {
          this.DataPlayTopic = resExam.payload;
          this.DataPlayTopic.time_type_exam = 0;
          this.Exam = resExam.payload
          // console.log(this.DataPlayTopic);
          this.idExam = this.Exam.id;
          // console.log(this.Exam.is_in_time && !this.Exam.have_done);
          this.statusExam = (this.Exam.is_in_time && !this.Exam.have_done);
          forkJoin([
            this.resultExam.ResultExam(id_user, this.Exam.id),
            // this.roundService.getExamsWhereId(this.Exam.id),
            // this.roundService.getpoetryOnesWhereId(id_poetry)
            // ]).subscribe(([resEXam, resExams]) => {
          ]).subscribe(([resEXam]) => {
            // resPoetry
            // console.log(resEXam.payload.status != 0)
            if (resEXam.payload == null || resEXam.payload.status == 0) {
              // console.log(resEXam);
              this.isFetchingRound = false;
              this.checkUserExam = true;
            }
            // if (resExams.status) {
            this.isFetchingRound = false;
            // this.roundDetail = resExams.payload;
            this.roundDetail = this.DataPlayTopic;
            this.roundDetail.start_time = new Date("2022-06-25 15:25:54");
            // this.round_id = resExams.payload.id;
            this.round_id = this.roundDetail.id;

            // }
            // this.DataPoetry = resPoetry.payload;
            // console.log(resPoetry.payload);

            // console.log(this.DataPoetry);
          });
        }
      })
    })


    // document.addEventListener('keydown', (event) => {

    //   if (event.key === 'F11') {
    //     this.isFullScreen == true;
    //     // const query = matchMedia('all and (display-mode: fullscreen)');
    //     // query.onchange = (e) => {
    //     //   this.isFullScreen = query.matches;
    //     // };
    //   }

    // // //     // console.log(isFullScreen );


    // // //     // if(!query.matches){
    // // //     //   console.log('abc1111');
    // // //     //         event.preventDefault();
    // // //     //    }
    // // //     // document.onclick = (event) => {
    // // //     //   if (document.fullscreenElement) {
    // // //     //     document
    // // //     //       .exitFullscreen()
    // // //     //       .then(() => console.log("Document Exited from Full screen mode"))
    // // //     //       .catch((err) => console.error(err));
    // // //     //   } else {
    // // //     //     document.documentElement.requestFullscreen();
    // // //     //   }
    // // //     // };

    // // //     // event.preventDefault();
    // // //     // console.log(event);
    // // //     // event.keyboard.lock(["Escape"]);
    // // //     // console.log('Không thể bấm F11');
    // // //   }

    // // console.log(this.isFullScreen);

    // });


  }

  ngOnDestroy(): void {
    this.handleRemoveAllEvent();
  }


  // totalScreen: number = 0;

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (event.keyCode === 122) { // F11
  //     this.isFullScreen = true;
  //     this.totalScreen++;
  //   }
  //   if (event.keyCode === 27) { // ESC
  //     event.preventDefault();
  //     console.log('Không thể bấm ESC');
  //   }
  // }


  enterFullscreen() {
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
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
        this.enterFullscreen();

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
        // console.log(this.idExam);
        setTimeout(() => {
          // kích thước khi full màn hình
          this.windowScreenSize = {
            width: window.innerWidth,
            height: window.innerHeight,
          };

          // bắt sự kiện thay đổi kích thước màn hình (f11)
          window.onresize = (e: any) => {
            if (this.isTimeOut || this.isSubmitingExam) return;

            const currentWindowWidth = e.target.innerWidth;
            const currentWindowHeight = e.target.innerHeight;

            const {width, height} = this.windowScreenSize;

            if (currentWindowWidth !== width || currentWindowHeight !== height) {
              this.dialog.closeAll();

              const dialogFullscreen = this.dialog.open(DialogConfirmComponent, {
                width: "300px",
                disableClose: true,
                data: {
                  isNotShowBtnCancel: true,
                  title: "Cảnh báo",
                  description: "Vui lòng bật full màn hình khi làm bài!",
                },
              });

              dialogFullscreen.afterClosed().subscribe((result) => {
                result === "true" && this.enterFullscreen();
              });
            } else {
              this.dialog.closeAll();
            }
          };

          // chặn f12, chặn copy
          window.onkeydown = (e: any) => {
            this.handleDisableKeydown(e);
            this.handleDisableCopy(e);
          };

        }, 100);

        this.roundService.getInfoCapacityExam(this.idExam).subscribe(res => {

          // console.log(res);
          if (res.status) {
            this.data = res.payload;
            let questionsOrder = JSON.parse(this.data.questions_order);
            this.isTakingExam = true;
            this.fakeQuestionData = questionsOrder.map((id: any) => this.data.questions.find((q: { id: any; }) => q.id === id));
            // console.log(this.fakeQuestionData);
            this.createFormControl();
            const durationExam = this.roundDetail.time_type_exam == 1 ? (this.data.time * 60 * 60) : this.data.time * 60;
            const regex = /\[anh\d*\]/g;

            // console.log(this.data);
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

            this.handleStartExam(durationExam);


          }
        });
      }
    })
  }

  // nộp bài
  handleSubmitExam() {
    // check làm thiếu câu hỏi
    console.log(this.formAnswers);
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
          this.handleRemoveAllEvent();
          // thoát toàn màn hình
          this.closeFullscreen();
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
          this.handleRemoveAllEvent();
          // thoát toàn màn hình
          this.closeFullscreen();
        }
      })
    }

  }

  getAnswersData() {

    const answerFormData = this.formAnswers.value;

    // danh sách id câu hỏi và câu trả lời
    // const answersData: { questionId: number, type: number, answerId: number }[] = [];
    // for (const key in answerFormData) {
    //   // const questionId = key.split("-")[2];
    //   const [, , questionId, questionType] = key.split("-");
    //
    //   answersData.push({
    //     questionId: +questionId,
    //     type: Number(questionType),
    //     answerId: answerFormData[key]
    //   })
    // }

    // danh sách id câu hỏi và câu trả lời
    const answersData: {
      questionId: number;
      answerId?: number;
      answerIds?: [];
      answer?: string;
      type: number; // 0: câu hỏi 1 đáp án, 1: câu hỏi nhiều đáp án, 2: code onl
    }[] = [];
    for (const key in answerFormData) {
      const questionId = key.split("-")[2];
      const questionType = +key.split("-")[3];

      if (questionType === 0) {
        answersData.push({
          questionId: +questionId,
          answerId: answerFormData[key],
          type: questionType,
        });
      } else if (questionType === 1) {
        answersData.push({
          questionId: +questionId,
          answerIds: answerFormData[key],
          type: questionType,
        });
      } else if (questionType === 2) {
        answersData.push({
          questionId: +questionId,
          answer: answerFormData[key],
          type: questionType,
        });
      }
    }

    return answersData;
  }

  createFormControl() {
    const ctrls: { [name: string]: FormControl | FormArray } = {};
    this.fakeQuestionData.forEach((question: any, index: number) => {
      const fieldName = `question-${++index}-${question.id}-${question.type}`;
      if (question.type === 0) {
        ctrls[fieldName] = new FormControl("", Validators.required);
      } else if (question.type === 1) {
        ctrls[fieldName] = new FormArray([], Validators.required);
      }
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
    // console.log(this.questionListId);
    const exitsId = this.questionListId.some(item => item.questionId === questionId);

    // nếu trong chưa có questionId
    if (!exitsId) {
      this.questionListId.push({
        questionId
      });
    }
  }

  // check câu hỏi đã làm
  checkQuesAnswered(controlName: number | string) {
    let isAnswerd = false;
    const formValues = this.formAnswers.value;
    for (const item in formValues) {
      if (item === controlName) {
        if (Array.isArray(formValues[item]) && formValues[item].length >= 1) {
          isAnswerd = true;
        }

        if (!Array.isArray(formValues[item]) && formValues[item]) {
          isAnswerd = true;
        }
      }
    }

    // const isAnswerd = this.questionListId.some(item => item.controlName === questionId);

    return isAnswerd;
  }

  // xử lý đối với câu hỏi có nhiều đáp án
  onCheckChange(formControlName: string, event: any) {
    const formArray: FormArray = this.formAnswers.get(formControlName) as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  // check đáp án của câu hỏi có nhiều đáp án
  // checkAnswerd(formControlNam: string, answerId: number) {
  //   let isChecked = false;
  //   const testResultLocal: TestResultStorage[] = JSON.parse(localStorage.getItem(this.testResultStorageKey) as string);
  //   const resultRoundExits = testResultLocal && testResultLocal.find((item) => item.round_id === this.roundDetail.id);
  //
  //   if (testResultLocal && resultRoundExits && resultRoundExits.data) {
  //     for (const item in resultRoundExits.data) {
  //       if (item === formControlNam) {
  //         isChecked = resultRoundExits.data[item].includes(answerId.toString()) ? true : false;
  //       }
  //     }
  //   }
  //
  //   return isChecked;
  // }

  // scroll khi click câu hỏi
  // scrollToQuestion(indexQuestion: number) {
  //   this.questions.forEach((questionRef, index) => {
  //     if (indexQuestion === index) {
  //       console.log('Đang phát triển');
  //       // questionRef.nativeElement.scrollIntoView();
  //       questionRef.nativeElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   })
  // }

  scrollToQuestion(questionIndex: number) {
    const questionElement = this.elementRef.nativeElement.querySelector(`#question-${questionIndex}`);
    if (questionElement) {
      questionElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  // bắt đầu làm bài
  handleStartExam(duration: number) {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    // this.isDoingExam = true;
    // console.log(this.isDoingExam );

    // tính thời gian làm bài ban đầu
    // const minutesExam = Math.floor(((duration % (60 * 60 * 24)) % (60 * 60)) / 60);
    // const secondsExam = Math.floor(((duration % (60 * 60 * 24)) % (60 * 60)) % 60);
    const minutesExam = Math.floor(duration / 60);
    const secondsExam = duration % 60;
    // console.log(minutesExam, secondsExam);
    this.countDownTimeExam.minutes = minutesExam;
    this.countDownTimeExam.seconds = secondsExam;

    // let timeStartExam: any = new Date(timeStart).getTime();
    let timeStartExam: any = new Date().getTime();
    // console.log(timeStartExam);
    const timeWillEndExam = new Date(timeStartExam + duration * 1000 + 1000);

    // let timerId: any;
    let futureDate = new Date(timeWillEndExam).getTime();
    // console.log(futureDate);
    this.timerId = setInterval(() => {
      let today = new Date().getTime();

      let distance = futureDate - today;
      console.log(distance);
      if (distance < 0) {
        this.countDownTimeExam.minutes = "00";
        this.countDownTimeExam.seconds = "00";
        clearInterval(this.timerId);

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
        // const minutes: string | number = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
        const minutes: string | number = Math.floor((distance / 1000) / 60);
        this.countDownTimeExam.minutes = minutes < 10 ? `0${minutes}` : minutes;

        // const seconds: number | string = Math.floor((distance % (60 * 1000)) / 1000);
        const seconds: number | string = Math.floor((distance / 1000) % 60);
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
      playtopic_id: this.data.id,
      data,
    }
  }


  handleSubmitExamPost() {
    this.openDialogSubmitExam();

    console.log(this.getResultExam());
    this.roundService.submitExam(this.getResultExam()).subscribe(res => {
      console.log(res);
      this.dialog.closeAll();
      clearInterval(this.timerId);

      this.route.params.subscribe(params => {
        const {id_user, id_poetry, id_campus, id_subject, id_semeter} = params;
        if (res.status) {
          this.dialog.open(DialogConfirmComponent, {
            width: '500px',
            disableClose: false,
            data: {
              title: "Nộp bài thành công",
              description: 'Bạn đã nộp bài thành công, ấn "Ok" hoặc ngoài cửa sổ thông báo để tắt thông báo này',
              isNotShowBtnCancel: true,
              isShowLoading: false,
            }
          })
          this.router.navigate(['/ca-thi', id_semeter]);
        }


      })

    })
  }

  // disable event
  disabledEvent(e: Event) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
  }

  // chặn f12
  handleDisableKeydown(e: any) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
      this.disabledEvent(e);
    }
    // "J" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
      this.disabledEvent(e);
    }

    // "C" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 67) {
      this.disabledEvent(e);
    }

    // "S" key + macOS
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      this.disabledEvent(e);
    }
    // "U" key
    if (e.ctrlKey && e.keyCode == 85) {
      this.disabledEvent(e);
    }
    // "F12" key
    if (e.keyCode == 123) {
      this.disabledEvent(e);
    }
    if (e.ctrlKey && (e.key == "p" || e.charCode == 16 || e.charCode == 112 || e.keyCode == 80)) {
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  // chặn f11
  handleDisableF11Key(e: any) {
    if (e.keyCode === 122) {
      this.disabledEvent(e);
    }
  }

  handleDisableESCKey(e: any) {
    if (e.keyCode === 27) {
      this.disabledEvent(e);
    }
  }

  // chặn copy
  handleDisableCopy(e: any) {
    if (e.ctrlKey && e.keyCode === 67) {
      this.disabledEvent(e);
      navigator.clipboard.writeText("Thí sinh không được gian lận trong quá trình làm bài!");
    }
  };

  // remove all event in page
  handleRemoveAllEvent() {
    window.onresize = () => {
    };
    window.onkeydown = () => {
    };
    window.oncontextmenu = () => {
    };
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }

    this.isFullScreen = false;
  }

}

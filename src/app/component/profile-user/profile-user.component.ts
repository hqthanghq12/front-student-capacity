import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToasterPosition, ToastyService as ToastyService2 } from 'ng-toasty';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})


export class ProfileUserComponent implements OnInit {
  
  disabledButton = false;
  // alert = {
  //     type: 'danger',
  //     message: "",
  // }
  ToasterPosition = ToasterPosition;

  public imagePath: string;
  statusEditUser: boolean = false;
  userInfo: User;
  nameUser: string;

  oldPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c), Validators.minLength(6)
  ]);

  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
    Validators.minLength(6)
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
    Validators.minLength(6)
  ]);


  userForm = this.formBuilder.group(
    {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword'),
    }
  );


  imgURL: any = 'https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: NgToastService,
    private toast2: ToastyService2,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.userInfo = this.userService.getUserValue();
    this.imgURL = this.userInfo.avatar;

    
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl?.errors?.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files[0];

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  EditInFoUser() {
    this.statusEditUser = true;

    let formDataUser = new FormData();
    if (this.imagePath == undefined) {
      this.imagePath = this.userInfo.avatar;
    }

    if (this.nameUser == undefined) {
      this.nameUser = this.userInfo.name;
    }

    formDataUser.append('name', this.nameUser);
    formDataUser.append('avatar', this.imagePath);
    this.userService.editInfoUser(formDataUser).subscribe(res => {
      if (res.status) {
        this.statusEditUser = false;
        this.toast.success({ summary: 'Sửa thành công !!!', duration: 2000 });
        this.userService.setLocalStorageHasEdit(res.payload);
      } else {
        if (res.payload.name) {
          this.toast.warning({ summary: res.payload.name, duration: 2000 });
          this.statusEditUser = false;
        } else if (res.payload.avatar) {
          this.toast.warning({ summary: res.payload.avatar, duration: 2000 });
          this.statusEditUser = false;
        }
      }
    })
  }

  setNameUser(event: any) {
    this.nameUser = event.target.value;
    console.log(this.nameUser);

    if (this.nameUser == undefined) {
      this.nameUser = this.userInfo.name;
    }
    if (this.nameUser.length > 30) {
      this.toast.warning({ summary: 'Chú ý độ dài tên !!!', duration: 3000 });
    }
  }

  onSubmit(): void {
    this.statusEditUser = true;
    if (!this.userForm?.valid) {
      return;
    }

    try {
      this.userService.updatePassword(this.userForm.value).subscribe(res => {
        if (res.status) {
          this.statusEditUser = false;
          switch(res.payload.type){
            case 'validate':
              this.toast2.danger(res.payload.message, 3000);
              break;
            case 'updated':
              this.toast2.success(res.payload.message, 3000);
              this.userForm.reset()
              break;
          }
        } else {
          console.log(res);
          this.toast2.danger(res.payload.message, 3000);
        }
      })
    } catch (error){
      console.log(error);
      this.toast2.danger('Có lỗi xảy ra !', 3000);
      
    }
  }
}

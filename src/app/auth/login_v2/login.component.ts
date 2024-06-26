import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';
import { emailDomainValidator } from 'src/app/validators/email-domain.validator';
import { ToasterPosition, ToastyService } from 'ng-toasty';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    userForm: FormGroup;
    disabledButton = false;
    alert = {
        type: 'danger',
        message: "",
    }
    ToasterPosition = ToasterPosition;


    socialUser!: SocialUser;
    c?: boolean = true;
    statusLogin: boolean = false;


    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        private toast: ToastyService,
        private userService: UserService,
        private socialAuthService: SocialAuthService,


    ) {
        this.userForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email, emailDomainValidator(['fpt.edu.vn', 'fe.edu.vn'])]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            remember: new FormControl(false)
        });

        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
      
            this.loginWithGoogle(this.socialUser.idToken)
          });
    }
    ngOnInit(): void { }
    onSubmit() {
        if (this.userForm.valid) {
            this.disabledButton = true;
            this.userForm.disable();
            this.loginService.login(this.userForm.value).subscribe(response => {
                if (response.status) {
                    setTimeout(() => {
                        this.toast.success('Đăng nhập thành công', 5000);
                        // this.router.navigate(['/']);
                        window.location.href = '/';
                    }, 1000);
                } else {
                    console.log(response.payload);
                    this.toast.danger(response.payload, 5000);
                    this.disabledButton = false;
                    this.userForm.enable();
                    this.userForm.get('password')?.setValue('');
                }
            })
        } else {
            this.disabledButton = false;
            this.userForm.enable();
            console.error('Form is invalid')
        }
    }

    loginWithGoogle(token: any): void {

        this.statusLogin = true;
        let dataSignIn = {
            token: token,
            campus_code: '1',
        };


        this.toast.warning('Đang tiến hành đăng nhập', 10000);
        this.userService.login(dataSignIn).subscribe((status) => {
            this.statusLogin = false;
            if (status) {
                setTimeout(() => {
                    //   this.toast.success({summary: 'Đăng nhập thành công', duration: 5000});
                    this.toast.success('Đăng nhập thành công', 5000);
                    this.router.navigate(['/']);
                }, 1000);
            } else {
                this.toast.danger('Không thể đăng nhập', 5000);
                // this.toast.error({summary: 'Không thể đăng nhập', duration: 5000});
            }
        });;
    }

    protected readonly event = event;
}
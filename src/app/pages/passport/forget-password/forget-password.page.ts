import { NgForm } from '@angular/forms';
import { PassportService } from './../shared/passport.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AuthenticationCodeService } from '../shared/authentication-code.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(private alertController: AlertController, private localStorageService: LocalStorageService, private router: Router,
    private passportService: PassportService, private codeService: AuthenticationCodeService, public alertCtrl: AlertController) { }
  checkUser = 0;
  user = {
    phone: '',
    password: '',
    confirmPassword: '',
    code: ''
  };
  slideIndex = 0;
  submited = false;
  code = '';

  /*
  *验证码结构体
  *code：存储验证码
  *codeLength：验证码长度
  *time：有效时间
  *fail：验证失败
  */
  verifyCode: any = {
    verifyCodeTips: '发送验证码',
    code: '',
    codeLength: 4,
    time: 60,
    disable: true,
    fail: false
  };

  @ViewChild('signupSlides', { static: false }) signupSlides: IonSlides;
  ngOnInit() {
  }

  onSubmitPhone(form: NgForm) {
    this.submited = true;
    // if (form.valid) {
    //   // 已通过客户端验证
    // }
    this.onNext();
  }

  ionViewWillEnter() {
    this.signupSlides.lockSwipes(true);
  }
  onNext() {
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slideNext();
    this.slideIndex++;
    this.signupSlides.lockSwipes(true);
  }
  onPrevious() {
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slidePrev();
    this.slideIndex--;
    this.signupSlides.lockSwipes(true);
  }

  // 获取验证码
  async getCode() {
    this.code = this.codeService.createCode(this.verifyCode.codeLength);
    const alert = await this.alertCtrl.create({
      header: '验证码',
      message: this.code,
      buttons: ['确认']
    });
    alert.present();
    this.verifyCode.disable = false;
    this.setCountdown();
  }

  // 设置验证码获取倒计时
  setCountdown() {
    if (this.verifyCode.time !== 1) {
      this.verifyCode.time--;
    } else {
      this.verifyCode.time = 60;
      this.verifyCode.verifyCodeTips = '重新获取';
      this.verifyCode.disable = true;
      return;
    }

    this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.time + ')';
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.time + ')';
      this.setCountdown();
    }, 1000);
  }

  // 判断验证码是否正确
  async onValidCode(form: NgForm) {
    if (form.valid) {
      const inputCode = this.user.code + '';
      if (inputCode !== this.code) {
        const alert = await this.alertCtrl.create({
          header: '错误',
          message: '验证码错误',
          buttons: ['确认']
        });
        alert.present();
      } else {
        this.onNext();
      }
    }
  }

  // 修改密码并提交
  async onSubmit() {
    let idx = 0;
    this.checkUser = 0;
    let users = this.localStorageService.get('users', []);
    let users_ident = this.localStorageService.get('user_ident', []);
    if (users != []) {
      for (let i = 0; i < users.length; ++i) {
        if (users[i].Phone == this.user.phone) {
          idx = i;
          this.checkUser = 1;
          break;
        }
      }
    }
    // 存在该用户
    if (this.checkUser == 1) {
      if (this.user.password == '') {
        let alert = await this.alertController.create({
          header: '提示',
          message: '密码不能为空！！！',
          buttons: ['确定']
        });
        alert.present();
      }
      else if (this.user.confirmPassword == this.user.password) {
        users[idx].Password = this.user.password;
        users_ident[idx].PasswordToken = this.user.password;
        this.localStorageService.set('users', users);
        this.localStorageService.set('user_ident', users_ident);
        this.router.navigateByUrl('/passport/login');
      }
      else if (this.user.confirmPassword != this.user.password) {
        let alert = await this.alertController.create({
          header: '提示',
          message: '两次密码不一致',
          buttons: ['确定']
        });
        alert.present();
      }
    }
    // 不存在该用户
    else {
      let alert = await this.alertController.create({
        header: '提示',
        message: '账号不存在',
        buttons: ['确定']
      });
      alert.present();
      this.router.navigateByUrl('/passport/login');
    }
  }

}

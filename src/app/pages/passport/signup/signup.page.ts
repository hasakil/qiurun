import { PassportService } from './../shared/passport.service';
import { AlertController, IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Signup } from './signup';
import { NgForm } from '@angular/forms';
import { AuthenticationCodeService } from '../shared/authentication-code.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signup: Signup = {
    phone: '',
    email: '',
    shopName: '',
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
    code : '',
    codeLength: 4,
    time: 60,
    disable: true,
    fail: false
  };

  // 验证密码是否相同
  check: any = {
      checkPassward: false
  };

  @ViewChild('signupSlides', {static: true}) signupSlides: IonSlides;

  constructor(private codeService: AuthenticationCodeService,
              public alertCtrl: AlertController, private passportService: PassportService) { }

  ngOnInit() {
    // this.signupSlides.lockSwipes(true);
  }

  onNext(){
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slideNext();
    this.slideIndex++;
    this.signupSlides.lockSwipes(true);
  }

  onPrevious(){
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slidePrev();
    this.slideIndex--;
    this.signupSlides.lockSwipes(true);
  }

  onSlideWillChange(event) {
    // this.signupSlides.getActiveIndex().then((index) => {
    //   this.slideIndex = index;
    // });
    console.log(event);
  }

  // 进入时设为不可滑动
  ionViewWillEnter()
  {
    this.signupSlides.lockSwipes(true);
  }

  // 存储用户信息
  saveUser(): boolean {
    console.log(1);

    const res: boolean = this.passportService.signup( this.signup.shopName, this.signup.phone,
                              this.signup.password, this.signup.email, this.signup.confirmPassword);
    if (res === true) {
      console.log('注册成功');
      return true;
    } else {
      console.log('注册失败');
      return false;
    }
  }

  async onSubmitPhone(form: NgForm) {
    if (this.passportService.checkPhone(this.signup.phone)){
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '该手机号已经被注册',
        buttons: ['确认']
      });
      alert.present();
      this.submited = false;
    }
    else{
      this.submited = true;
      this.onNext();
    }
  }

  // 返回按钮
  onBack(){
    this.onPrevious();
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
      const inputCode = this.signup.code + '';
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

  // 检验两次输入密码是否一致,一致则继续
  confirmTwoPassword(){
    if (this.signup.password !== this.signup.confirmPassword) {
      this.check.checkPassward = true;
      console.log('输入密码不一致！');
    } else {
      this.onNext();
      this.check.checkPassward = false;
    }
  }

  async onSignupInformation(form: NgForm) {
    if (form.valid) {
      if (this.signup.password !== this.signup.confirmPassword) {
        const alert = await this.alertCtrl.create({
          header: '错误',
          message: '两次密码不一致',
          buttons: ['确认']
        });
        alert.present();
      } else {
        this.onNext();
      }
    }
  }
}

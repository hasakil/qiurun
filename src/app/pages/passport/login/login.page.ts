import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { PassportService } from 'src/app/pages/passport/shared/passport.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnInit {

  username: string = ''; // 视图模型的属性账号，双向绑定
  password: string = ''; // 视图模型的属性密码，双向绑定
  toastController: any;

  constructor(private localStorageService: LocalStorageService,
              private passportService: PassportService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private router: Router,
  ) { }

  ngOnInit() {
  }



  async onLogin(form: NgForm) {
    if (this.username == '') {
      let toast = await this.toastCtrl.create({
        message: '请输入您的手机号码或者邮箱',
        duration: 3000
      });
      toast.present();
    }
    else if (this.password == '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的密码',
        duration: 3000
      });
      toast.present();
    }
    else {
      let checkUser = 0;
      const users = this.localStorageService.get('users', []);
      if (users != []) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < users.length; ++i) {
          if ((users[i].Phone == this.username || users[i].Email == this.username) && (users[i].Password == this.password)) {
            this.localStorageService.set('user-token', {username: this.username});
            checkUser = 1;
            alert('登录成功');
            // this.router.navigateByUrl('/Home');
          }
        }
        if (!checkUser) {
          let alert = await this.alertCtrl.create({
            header: '提示',
            message: '用户名或者密码不正确',
            buttons: ['确定']
          });
          alert.present();
        }
      }
      else{
        let alert = await this.alertCtrl.create({
          header: '提示',
          message: '该用户未注册！',
          buttons: ['确定']
        });
        alert.present();
      }
    }
  }
  onForgotPassword() {
    console.log('here');
    this.router.navigateByUrl('/passport/forgot-password');
  }
}



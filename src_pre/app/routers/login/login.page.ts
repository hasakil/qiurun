import {Component, NgModule, OnInit} from '@angular/core';
import {AlertController, NavController, ToastController} from '@ionic/angular'
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../shared/services/local-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    username: string = ''; // 视图模型的属性账号，双向绑定
    password: string = '';

    // 视图模型的属性密码，双向绑定
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private router: Router, private localStorageService:LocalStorageService) { }

    ngOnInit() {
    }
    openForgotPassword() {

    }
    async onLogin(form: NgForm) {
        // 判断的代码省略
        if (!this.username) {
            let toast = await this.toastCtrl.create({
                message: '请输入您的手机号码或者邮箱',
                duration: 3000
            });
            toast.present();
        } else if (!this.password) {
            let toast = await this.toastCtrl.create({
                message: '请输入密码',
                duration: 3000
            });
            toast.present();
        } else {
            if (this.username !== 'admin' && this.password !== 'admin') {
                let alert =await this.alertCtrl.create({
                    header: '提示',
                    message:'用户名或者密码不正确',
                    buttons:['确定']
                });
                alert.present();
            } else {
                let userInfo = { username: '杨伟翔hhh', phone: 18965151466};
                this.localStorageService.set('UserInfo', userInfo);
                this.router.navigateByUrl('\home');
            }
        }


    }


}

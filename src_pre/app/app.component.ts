import {Component, ViewEncapsulation} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LocalStorageService} from "./shared/services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public appPages = [
      { title: '开店论坛', url: '/home', icon: 'chatboxes' },
      { title: '手机橱窗', url: '/home', icon: 'create' },
      { title: '邀请有礼', url: '/home', icon: 'git-merge' },
      { title: '资金账户', url: '/home', icon: 'cash' },
      { title: '反馈建议', url: '/home', icon: 'cash' },
      { title: '帮助中心', url: '/home', icon: 'cash' },
  ];
  userName = '';
  phone = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localStorageService:LocalStorageService
  ) {
    this.initializeApp();
  }
    ionViewWillEnter() {
      console.log('hhh')
        let userInfoConfig: any = this.localStorageService.get('UserInfo', {});
        console.log(userInfoConfig)
        this.userName = userInfoConfig.username
        this.phone = userInfoConfig.phone
    }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

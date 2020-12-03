import { SettingService } from './../setting/setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  constructor(private settingService: SettingService) { }

  ngOnInit() {
  }

  // 修改用户信息的时候不用刷新页面？全局变量一变页面也会跟着变
  get user(){
    return this.settingService.user;
  }
}

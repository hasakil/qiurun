import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  user: any = {}; // 大的user，保存了用户和店铺信息，与下面不一样
  appConfig: any = {};  // app 与其他两个不用合并，这个保存的是版本号，合并用户和店铺就行
  constructor() { }

  // 登录成功以后调用,也可以合并成一步？
  load(userFromLogin: any){
    const shop: any = {};
    this.user = {
      ...userFromLogin,
      ...shop
    };
  }
}

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
@Injectable({
  providedIn: 'root'
})
export class PassportService {
  static User_Id = 0;
  static User_ident_id = 0;
  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 注册，保存用户信息
   */
  signup(shopName: string, phone: string, password: string, email: string, comfirpassword: string): boolean {
    const account = this.localStorageService.get('users', []);
    const account_ident = this.localStorageService.get('users_ident', []);
    console.log('account:' + account);
    if (account != [] && (phone === account.Phone || email === account.Email)) {
      console.log('this account has been already registered!');
      return false;
    }
    const time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    const user = {
      Id: ++PassportService.User_Id,
      ShopName: shopName,
      Phone: phone,
      Email: email,
      CreateDate: time,
      Password: password,
      // comfirmpassword: comfirpassword
    };
    account.push(user);
    // tslint:disable-next-line: variable-name
    const user_ident = {
      Id: ++PassportService.User_ident_id,
      UserId: user.Id,
      Type: '手机和邮箱',
      ThirdParty: 0,
      Identifier: 1,
      PasswordToken: password
    };
    account_ident.push(user_ident);
    this.localStorageService.set('users', account);
    console.log(account);
    this.localStorageService.set('user_ident', account_ident);
    console.log(user_ident);
    return true;
  }

  /**
   * 验证登陆
   */
  // login(phoneOrEmail: string, password: string): boolean {
  //   const account = this.localStorageService.get('user', '');
  //   const account_ident = this.localStorageService.get('user_ident', '');
  //   console.log(account_ident.PasswordToken);
  //   console.log(account.Phone);
  //   console.log('input ident : ' + phoneOrEmail);
  //   console.log('input passwd : ' + password);
  //   if (account === null || !((account.Phone === phoneOrEmail || account.Email === phoneOrEmail)
  //     && password == account_ident.PasswordToken)) {
  //     return false;
  //   }
  //   /*
  //  console.log(a.success);
  //  return new AjaxResult(false, null, {
  //    message: '',
  //    detail: ''
  //   });
  //   */
  //   return true;
  // }

  // 验证手机号是否注册
  checkPhone(phone: string): boolean {
    const account = this.localStorageService.get('users', []);
    if (account != []) {
      for (let i = 0; i < account.length; ++i) {
        if (phone == account[i].Phone) {
          return true;
        }
      }
      return false;
    }
    else { return true; }

  }
}

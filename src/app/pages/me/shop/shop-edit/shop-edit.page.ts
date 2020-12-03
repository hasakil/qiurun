import { SettingService } from './../../setting/setting.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {

  title: string;
  property: string;
  value: string; // 用于ngModel，从shop对象的相关属性中获取数据
  shop: any; // 用于保存从本地存储中获得店铺数据
  constructor(private activatedRoute: ActivatedRoute, private settingService: SettingService) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.property = queryParams.property;
      this.title = queryParams.title;
    });
    // this.property = activatedRoute.snapshot.queryParams['property'];
    // this.title = this.activatedRoute.snapshot.queryParams['title'];
    // this.property = activatedRoute.snapshot.queryParams.property;
    // this.title = this.activatedRoute.snapshot.queryParams.title;
  }
  get user(){
    return this.settingService.user;
  }
  ngOnInit() {
  }

}

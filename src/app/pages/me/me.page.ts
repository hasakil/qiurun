import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  public appPages = [
    { title: '开店论坛', url: '/tabs/home', icon: 'cash' },
    { title: '手机橱窗', url: '/tabs/home', icon: 'create' },
    { title: '邀请有礼', url: '/tabs/home', icon: 'git-merge' },
    { title: '资金账户', url: '/tabs/home', icon: 'cash' },
    { title: '反馈建议', url: 'tabs/home', icon: 'cash' },
    { title: '帮助中心', url: 'tabs/home', icon: 'cash' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

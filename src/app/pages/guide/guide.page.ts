import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuidePage implements OnInit {
  showSkip = true;
  @ViewChild('slides', {static: true}) slides: IonSlides;
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    const appConfig = this.localStorageService.get('APP', {
      version: '1.2.7',
      mobile: '13215001837',
      launch: false
    });
    if ( appConfig.launch === true ){
      // this.router.navigateByUrl('tabs');
    }else {
      appConfig.launch = true;
      this.localStorageService.set('APP' , appConfig);
    }
  }
  onSlideWillChange(){
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }
  onSkip(){
    this.router.navigateByUrl('passport/signup');
  }

}

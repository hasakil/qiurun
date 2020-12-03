import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('signupSlides', {static: false}) signupSlides: IonSlides;
    slideIndex = 0;
    submit = false;
    signup = {
      phone: '',
      email: '',
      shopName: '',
      password: '',
      confirmPassword: '',
      code: ''
    };
    constructor() { }

    ngOnInit() {
      // this.signupSlides.lockSwipeNext(true);
    }
      async onSlideDidChange(event) {
          // this.signupSlides.slideIndex = await
          // this.signupSlides.getActiveIndex();
          this.slideIndex = await this.signupSlides.getActiveIndex();
      }
      onInputPhone() {
          // this.submit = true;
          this.onNext();
      }
    onInputCode() {

    }
    onInputInfo() {

    }
    onNext(){
      this.slideIndex++;
      this.signupSlides.slideNext();
    }
    onPrevious() {
      this.slideIndex--;
      this.signupSlides.slidePrev();
    }

}

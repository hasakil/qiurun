import { Injectable } from '@angular/core';
import {Register} from "ts-node";

class AjaxResult {
    targetUrl: string;
    result: any;
    success: boolean;
    error: {
        message: string;
        details: string;
    };
    unAuthorizedRequest: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: any = window.localStorage;
  constructor() { }

  get(key: string, defaultValue: any): any {
      let value: any = this.storage.getItem(key);
      try{
          value = JSON.parse(value);
      } catch (error) {
          value = null;
      }
      if (value === null && defaultValue) {
          value = defaultValue;
      }
      return value;
  }

    // @ts-ignore
    async signup(register: Register): Promise<AjaxResult> {

    }

  set(key: string, value: any) {
      this.storage.setItem(key,JSON.stringify(value));
  }

  remove(key: string) {
      this.storage.removeItem(key);
  }
}

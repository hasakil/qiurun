import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage = window.localStorage;
  constructor() { }
  get(key: string, defaultValue?: any): any{
    let value = this.localStorage.getItem(key);
    try{
      value = JSON.parse(value);
    } catch (error){
      value = null;
    }
    if ( value === null && defaultValue ) {
      value = defaultValue;
    }
    return value;
  }
  set(key: string, value: any) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string ){
    this.localStorage.removeItem(key);
  }
}

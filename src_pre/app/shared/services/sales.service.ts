import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor() { }

    getSales(): number {
        return Math.round(Math.random()*100);
    }
}

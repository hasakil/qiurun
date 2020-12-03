import { Injectable } from '@angular/core';
import {CATEGORIES} from '../mock.categories';
import {AjaxResult} from "../ajax-result";
import {LocalStorageService} from "../../shared/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    // private localStorageService: any;

  constructor(private localStorageService: LocalStorageService) { }
  async getAll(): Promise<AjaxResult> {
      const categories = this.localStorageService.get('Category', CATEGORIES);
      return {
          targetUrl: '',
          result: categories,
          success: true,
          error: null,
          unAuthorizedRequest: false
      };
  }
    updateActiveCategory(category) {

    }
}

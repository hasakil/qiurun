import { Component, OnInit } from '@angular/core';
import {Category} from '../../shared/category';
import {ActionSheetController, NavController, NavParams} from '@ionic/angular';
import {CategoryService} from '../../shared/services/category.service';
import {debugOutputAstAsTypeScript} from '@angular/compiler';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
    activeCategory: Category;
    categories: Array<Category>;
    activeCategoryId: number;
    activeSubCategories: Array<Category>;
    activeSubCategoriesLength: number;
    activeSubCategory: Category;
    categoryToAdd: Category;
    subCategoriesLength: number;
    constructor(private categoryService: CategoryService, private actionSheetController: ActionSheetController) {
            categoryService.getAll().then((data) => {
                this.categories = data.result;
                if (this.categories) {
                    this.activeCategory = this.categories[0];
                }
            });

    }
  selectCategory(category: Category) {
      this.activeCategory = category;
      this.activeCategoryId = category.id;
      let i: number;
      for (i = 0; i < this.categories.length; i++) {
          if (this.activeCategory.id === this.categories[i].id) {
              this.activeCategoryId = i;
              this.activeSubCategories = this.categories[i].children;
              this.activeSubCategoriesLength = this.activeSubCategories.length;
              break;
          }
      }
  }
  selectSubCategory(category: Category) {
      console.log(category.id)
      if (null == category) {
          category = this.categories[0];
      }
      this.categoryService.updateActiveCategory(category);
      this.activeSubCategory = category;
      // this.navCtrl.pop();
  }
  // gotoAddSubCategory() {
  //     this.navCtrl.push(CategoryAddSubPage, {
  //         id: this.activeCategoryId,
  //         name: this.categories[this.activeCategoryId].name
  //     });
  // }
  //   async presentActionSheet(mtitle: string) {
  //       const actionSheet = this.actionSheetCtrl.create({
  //           title: mtitle,
  //           buttons: [
  //               {
  //                   text: '新增小分类',
  //                   role: 'destructive',
  //                   handler: () => {
  //                       // this.gotoAddSubCategory();
  //                   }
  //               }, {
  //                   text: '编辑分类',
  //                   handler: () => {
  //                       // this.gotoEditSubCategory();
  //                   }
  //               }, {
  //                   text: '取消',
  //                   role: 'cancel',
  //                   handler: () => {
  //                       console.log('Cancel clicked');
  //                   }
  //               }
  //           ]
  //       });
  //       actionSheet.present();
  //       await actionSheet.present();
  //   }
  ngOnInit() {
  }

}

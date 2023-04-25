import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from '../interface/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  productDialog!: boolean;

  products: Category[] = [];

  product!: Category;

  submitted!: boolean;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getCategory().subscribe((x) => {
      console.log(x);
      this.products = x;
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Category) {
    const data: Category = {
      categoryName: product.categoryName,
    };

    this.confirmationService.confirm({
      message: 'კატეგორიის წაშლა',
      header: 'დათანხმება',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.removeCategory(data).subscribe((x) => {
          if (x) {
            this.products = this.products.filter(
              (val) => val.id !== product.id
            );
            this.product = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Deleted',
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'კატეგორია',
              detail: 'კატეოგრია არ წაიშალა',
              life: 3000,
            });
          }
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.categoryName?.trim()) {
      if (this.product.id) {
        const category: Category = {
          id: this.product.id,
          categoryName: this.product.categoryName,
        };
        const prod = this.products.filter((x) => x.id === this.product.id);

        this.categoryService.updateCategory(category).subscribe((x) => {
          if (x !== false) {
            prod[0].categoryName = x.categoryName;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'კატეგორია განახლებულია',
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'კატეგორია უკვე არსებობს',
              life: 3000,
            });
          }
        });
      } else {
        this.categoryService.createCategory(this.product).subscribe((x) => {
          this.products.push(x);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'კატეოგრია დამატებულია',
            life: 3000,
          });
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }
}

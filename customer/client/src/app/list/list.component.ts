import { Component, OnInit } from '@angular/core'
import { CategoryResourceService, Category } from 'src/shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categories: Array<Category> = []
  constructor(public categoryResourceService: CategoryResourceService) {
    this.categoryResourceService.getAllCategoriesUsingGET().subscribe(res => {
      this.categories = res
    })
  }

  ngOnInit() {}
}

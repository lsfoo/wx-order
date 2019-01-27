import { Component, OnInit } from '@angular/core'
import { CategoryResourceService } from '../../openapi/api/categoryResource.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(public categoryResourceService: CategoryResourceService) {}

  ngOnInit() {
    this.categoryResourceService.getAllCategoriesUsingGET().subscribe(res => {
      console.log(res)
    })
  }
}

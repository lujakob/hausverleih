import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from "../../shared/services/firestore.service";
import { Router } from '@angular/router';
import { ICategory, IIventoryItem } from '../inventory.domain';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryListComponent implements OnInit {

  public items: IIventoryItem[] = [];

  displayedColumns = ['title', 'owner', 'category'];
  dataSource = [];
  dataSourceFiltered = [];
  selectedCategory: number;

  public categoryFilterForm = new FormGroup({
    categoryFilter: new FormControl('')
  });

  public categories: ICategory[] = [
    {title: 'Magazin', id: 1},
    {title: 'Bücher', id: 2}
  ];

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
    ) { }

  ngOnInit() {

    this.categoryFilterForm
      .get('categoryFilter')
      .valueChanges
      .subscribe((categoryId: number) => {
        this.selectedCategory = categoryId;
        this.applyFilters()
      });

    this.firestoreService
      .colWithIds$('inventory', ref => ref.orderBy('title', 'asc'))
      .subscribe(data => {
        this.dataSource = data;
        this.applyFilters()
      });
  }

  private applyFilters() {
    this.dataSourceFiltered = this.dataSource.filter(item => {
      return !!this.selectedCategory ? item.category.id === this.selectedCategory : true;
    });
  }

  onClick(row) {
    this.router.navigate(['inventory', row.id])
  }
}

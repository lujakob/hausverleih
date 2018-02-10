import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from "../../shared/services/firestore.service";
import { Router } from '@angular/router';
import { ICategory, IIventoryItem } from '../inventory.domain';

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

  public categoryFilter = new FormControl();

  public categories: ICategory[] = [
    {title: 'Magazin', id: 1},
    {title: 'Bücher', id: 2}
  ];

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
    ) { }

  ngOnInit() {
    this.firestoreService
      .colWithIds$('inventory', ref => ref.orderBy('title', 'asc'))
      .subscribe(data => this.dataSource = data);


    this.categoryFilter.registerOnChange(el => {
      console.log(el);
    })
  }

  onClick(row) {
    this.router.navigate(['inventory', row.id])
  }
}

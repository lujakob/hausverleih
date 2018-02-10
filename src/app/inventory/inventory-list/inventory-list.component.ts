import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../shared/services/firestore.service";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  public items: any[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.col$('inventory').subscribe(items => this.items = items);
  }

}

import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../shared/services/firestore.service";
import { Router } from '@angular/router';
import { IIventoryItem } from '../inventory.domain';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  public items: IIventoryItem[] = [];

  displayedColumns = ['title', 'owner'];
  dataSource = [];

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
    ) { }

  ngOnInit() {
    this.firestoreService.colWithIds$('inventory').subscribe(data => this.dataSource = data);
  }

  onClick(row) {
    this.router.navigate(['inventory', row.id])
  }
}

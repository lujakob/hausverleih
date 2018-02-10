import { Component, OnInit } from '@angular/core';
import {IIventoryItem} from "../../inventory/inventory.domain";
import {Router} from "@angular/router";
import {FirestoreService} from "../../shared/services/firestore.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public items: IIventoryItem[] = [];

  displayedColumns = ['createdAt', 'title', 'category'];
  dataSource = [];

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firestoreService
      .colWithIds$('inventory', ref => ref.orderBy('createdAt', 'desc'))
      .subscribe(data => this.dataSource = data);
  }

  onClick(row) {
    this.router.navigate(['inventory', row.id])
  }
}

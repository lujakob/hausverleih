import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {IIventoryItem} from "../../inventory/inventory.domain";
import {Router} from "@angular/router";
import {FirestoreService} from "../../shared/services/firestore.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  displayedColumns = ['title', 'category', 'createdAt'];
  dataSource: IIventoryItem[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firestoreService
      .colWithIds$('inventory', ref => ref.orderBy('createdAt', 'desc'))
      .subscribe((data: IIventoryItem[]) => this.dataSource = data);
  }

  onClick(row) {
    this.router.navigate(['inventory', row.id])
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import {FirestoreService} from "../../shared/services/firestore.service";
import { IIventoryItem } from '../inventory.domain';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  public data: IIventoryItem;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.route.params
      .map(p => p.id)
      .subscribe((id: string) => {
        this.loadData(id)
      });
  }

  loadData(id: string) {
    const ref = `inventory/${id}`;
    this.firestoreService
      .doc$(ref)
      .subscribe((data: IIventoryItem) => this.data = data);
  }
}

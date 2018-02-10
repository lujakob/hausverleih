import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from "../../shared/services/firestore.service";
import { IIventoryItem, IInventoryRequest } from '../inventory.domain';
import { User } from "../../user/user";
import { AuthService } from "../../auth/auth.service";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  private user: User;
  public requests: IInventoryRequest[] = [];
  private docId: string;
  // public data: IIventoryItem;
  public data: any;
  public claimItemActionEnabled: boolean = false;
  public showRequestBtn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {

    Observable.combineLatest(
      this.auth.user,
      this.route.params
    ).switchMap(([user, params]) => {
      this.user = user;
      this.docId = params.id;

      const detailRef = `inventory/${this.docId}`;
      const requestRef = `inventory/${this.docId}/requests`;

      return Observable.combineLatest(
        this.firestoreService.doc$(detailRef),
        this.firestoreService.colWithIds$(requestRef)
      );

    }).subscribe(([data, requests]) => {
      console.log("data", data);
      console.log("requests", requests);
      this.requests = <IInventoryRequest[]>requests;
      this.data = data;

      this.claimItemActionEnabled = this.updateItemActionEnabled();

      this.showRequestBtn = !this.userIsItemHolder();
    });

  }

  updateItemActionEnabled() {
    return !this.userHasRequested() && !this.userIsItemHolder();
  }

  userHasRequested() {
    return this.requests && this.requests.filter(item => item.user.id === this.user.uid).length > 0;
  }

  userIsItemHolder() {
    return this.user && this.data && this.user.uid === this.data.holder.id;
  }

  requestItem() {
    const ref = `inventory/${this.docId}/requests`;
    const data: IInventoryRequest = {
      user: {
        id: this.user.uid,
        name: this.user.displayName
      }
    };

    this.firestoreService.add(ref, data);
  }

  transferItem() {
    if (! (this.requests && this.requests[0])) {
      console.log('requests data is empty');
      return;
    }

    const deleteRef = `inventory/${this.docId}/requests/${this.requests[0].id}`;
    this.firestoreService
      .delete(deleteRef)
      .then(res => console.log(res))
      .catch(e => console.log(e));

    const updateRef = `inventory/${this.docId}`;
    const {id, name} = this.requests[0].user;
    const data = {holder: {id, name}};
    this.firestoreService
      .update(updateRef, data)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  loadData(id: string) {
    const ref = `inventory/${id}`;
    this.firestoreService
      .doc$(ref)
      .subscribe((data: IIventoryItem) => {
        this.data = data;

        this.claimItemActionEnabled = this.user.uid !== this.data.holder.id;
        console.log(data);
        console.log(this.user);
        console.log(this.claimItemActionEnabled);
      });
  }

}

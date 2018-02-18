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
        this.firestoreService.colWithIds$(requestRef, ref => ref.orderBy('createdAt', 'asc'))
      );

    }).subscribe(([data, requests]) => {
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

  onRequestItem() {
    this.requestItem();
    this.addPendingRequestToHolder();
  }

  addPendingRequestToHolder() {
    const ref = `users/${this.data.holder.id}/pending-requests/${this.docId}`;
    const data = {
      inventoryTitle: this.data.title
    };

    this.firestoreService.set(ref, data);
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

    const request = this.requests[0];

    // delete request
    const deleteRef = `inventory/${this.docId}/requests/${request.id}`;
    this.firestoreService
      .delete(deleteRef)
      .catch(e => console.log(e));

    // update asset holder
    const updateRef = `inventory/${this.docId}`;
    const {id, name} = request.user;
    const data = {holder: {id, name}};
    this.firestoreService
      .update(updateRef, data)
      .catch(e => console.log(e));

    // delete pending request
    const deletePendingRef = `users/${this.data.holder.id}/pending-requests/${this.docId}`;
    this.firestoreService
      .delete(deletePendingRef)
      .catch(e => console.log(e));
  }
  
}

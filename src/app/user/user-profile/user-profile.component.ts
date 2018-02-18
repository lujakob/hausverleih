import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FirestoreService} from '../../shared/services/firestore.service';
import {AuthService} from '../../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../user/user';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  private user: User;
  public requests = [];
  public assets = [];
  public requestsColumns = ['inventoryTitle'];
  public assetsColumns = ['title', 'category', 'delete'];

  constructor(
    private firestoreService: FirestoreService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user
      .subscribe((user: User) => {
        this.user = user;

        this.loadRequests(user);
        this.loadAssets(user);

      });

  }

  loadRequests(user: User) {
    if (!user) return;

    const ref = `users/${user.uid}/pending-requests`;
    this.firestoreService
      .colWithIds$(ref, ref => ref.orderBy('createdAt', 'desc'))
      .subscribe(data => {
        this.requests = data;
      });
  }

  loadAssets(user: User) {
    if (!user) return;

    const ref = `inventory`;
    this.firestoreService
      .colWithIds$(ref, ref => {

        ref.where('owner.id', '==', user.uid);
        return ref;
      })
      .subscribe(data => {
        this.assets = data;
      });
  }

  switchContent(event) {
    console.log(event);
  }

  onClick(row) {
    this.router.navigate(['inventory', row.id])
  }

  delete(row) {
    console.log(row);
  }
}

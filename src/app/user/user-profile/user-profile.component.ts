import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../shared/services/firestore.service";
import {AuthService} from "../../auth/auth.service";
import { Router } from '@angular/router';
import { User } from "../../user/user";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private user: User;
  dataSource = [];
  displayedColumns = ['inventoryTitle'];

  constructor(
    private firestoreService: FirestoreService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user
      .switchMap((user: User) => {
        this.user = user;

        const ref = `users/${user.uid}/pending-requests`;
        return this.firestoreService
          .colWithIds$(ref, ref => ref.orderBy('createdAt', 'desc'));

      })
      .subscribe(data => {
          this.dataSource = data;
      });

  }

  onClick(row) {
    this.router.navigate(['inventory', row.id])
  }
}

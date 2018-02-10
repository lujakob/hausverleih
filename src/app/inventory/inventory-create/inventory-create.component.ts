import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FirestoreService} from "../../shared/services/firestore.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../user/user";
import {Router} from "@angular/router";

interface Category {
  title: string;
  uid: number;
}

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryCreateComponent implements OnInit {

  private user: User;

  public categories: Category[] = [
    {title: 'Magazin', uid: 1},
    {title: 'Bücher', uid: 2}
  ];

  public itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });

  constructor(
    private auth: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user: User) => this.user = user);
  }

  createItem() {
    console.log("valid", this.itemForm.valid);
    if (this.itemForm.valid) {
      const values = this.itemForm;
      const data = {
        title: values.get('title').value,
        categoryId: values.get('category').value,
        userId: this.user.uid,
        userName: this.user.displayName
      };

      this.firestoreService
        .add('inventory', data)
        .then( data => {
          console.log(data);
          this.router.navigate(['inventory']);
        })
        .catch(e => console.log(e));

      console.log(values);
    }
  }

  onBack() {
    this.router.navigate(['inventory']);
  }
}

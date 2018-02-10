import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FirestoreService} from "../../shared/services/firestore.service";
import {AuthService} from "../../auth/auth.service";
import {User} from "../../user/user";
import {Router} from "@angular/router";
import { ICategory, IIventoryItem } from '../inventory.domain';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryCreateComponent implements OnInit {

  private user: User;

  public categories: ICategory[] = [
    {title: 'Magazin', id: 1},
    {title: 'Bücher', id: 2}
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
    console.log("form values", this.itemForm.getRawValue());

    if (this.itemForm.valid) {
      this.firestoreService
        .add('inventory', this.buildItem())
        .then( data => {
          console.log(data);
          this.router.navigate(['inventory']);
        })
        .catch(e => console.log(e));
    }
  }

  buildItem(): IIventoryItem {
    const values = this.itemForm;
    const user = {id: this.user.uid, name: this.user.displayName};

    return  {
      title: values.get('title').value,
      category: this.categories.find(cat => cat.id === parseInt(values.get('category').value, 10)),
      owner: user,
      holder: user
    };
  }

  onBack() {
    this.router.navigate(['inventory']);
  }
}

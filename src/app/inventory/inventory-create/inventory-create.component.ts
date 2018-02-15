import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FirestoreService } from '../../shared/services/firestore.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user';
import { Router } from '@angular/router';
import { ICategory, IIventoryItem, IUpload } from '../inventory.domain';
import { Upload } from '../../shared/services/upload';
import { UploadService } from '../../shared/services/upload.service';
import { Ng2ImgToolsService } from 'ng2-img-tools';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryCreateComponent implements OnInit {

  private user: User;

  selectedFiles: FileList | null;
  currentUpload: IUpload;

  public categories: ICategory[] = [
    {title: 'Magazin', id: 1},
    {title: 'Bücher', id: 2}
  ];

  public itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private firestoreService: FirestoreService,
    private upSvc: UploadService,
    private router: Router,
    private ng2ImgToolsService: Ng2ImgToolsService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user: User) => this.user = user);
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('No file found!');
    }
  }

  saveItem() {
    if (!this.itemForm.valid) {
      return;
    }

    const fileNamePrefix = this.itemForm.get('title').value.toLowerCase() + '-';
    const file = this.selectedFiles;

    if (file && file.length === 1) {

      this.ng2ImgToolsService.resize([file.item(0)], 500, 500).subscribe(result => {

        this.currentUpload = new Upload(result);

        this.upSvc
          .pushUpload(this.currentUpload, fileNamePrefix)
          .then((upload: Upload) => {
            this.createItem(upload);
          })
          .catch(e => console.log(e));
      }, error => {
        console.log(error);
      });

    } else {
      console.error('No file found!');
      this.createItem();
    }
  }

  createItem(upload?: IUpload) {
    this.firestoreService
      .add('inventory', this.buildItem(upload))
      .then( data => {
        console.log(data);
        this.router.navigate(['inventory']);
      })
      .catch(e => console.log(e));
  }

  buildItem(upload?: IUpload): IIventoryItem {
    console.log(upload);
    const values = this.itemForm;
    const user = {id: this.user.uid, name: this.user.displayName};

    return  {
      title: values.get('title').value,
      category: this.categories.find(cat => cat.id === parseInt(values.get('category').value, 10)),
      owner: user,
      holder: user,
      // delete file property because of 'firebase Unsupported field value: a custom File object' problem
      media: Object.assign({}, upload, {file: null})
    };
  }

  onBack() {
    this.router.navigate(['inventory']);
  }
}

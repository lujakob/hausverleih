import { Injectable } from '@angular/core';
import { Upload } from './upload';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from './firestore.service';
import {IUpload} from "../../inventory/inventory.domain";


@Injectable()
export class UploadService {

  basePath = 'uploads';
  uploadsRef: AngularFireList<Upload>;
  uploads: Observable<Upload[]>;

  constructor(private firestoreService: FirestoreService) { }

  getUploads() {
    this.uploads = this.firestoreService.col$(this.basePath);
    return this.uploads;
  }

  deleteUpload(upload: IUpload) {
    this.deleteFileData(upload.$key)
      .then( () => {
        this.deleteFileStorage(upload.name);
      })
      .catch((error) => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: IUpload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    return new Promise((resolve, reject) => {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
          // upload in progress
          const snap = snapshot;
          upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
        },
        (error) => {
          // upload failed
          console.log(error);
          return reject(error);
        },
        () => {
          // upload success
          if (uploadTask.snapshot.downloadURL) {
            upload.url = uploadTask.snapshot.downloadURL;
            upload.name = upload.file.name;
            console.log("resolve", upload);
            return resolve(upload);
          } else {
            console.error('No download URL!');
            return reject('No download URL!');
          }
        },
      );
    });

  }

  // Writes the file details to the realtime db
  private saveFileData(upload: IUpload) {
    this.firestoreService.add(`${this.basePath}/`, upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.firestoreService.delete(`${this.basePath}/${key}`);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
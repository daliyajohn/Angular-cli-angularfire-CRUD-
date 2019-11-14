import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  listUrl: string = 'http://dummy.restapiexample.com/api/v1/employees';
  deleteUrl = 'http://dummy.restapiexample.com/api/v1/delete/';
  createUserUrl = 'http://dummy.restapiexample.com/api/v1/create';
  updateUserUrl = 'http://dummy.restapiexample.com/api/v1/update/';

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }


  // get user details
  getUsersData() {
    return  this.db.list('/employeelist').snapshotChanges();
  }

  // delete user
  deleteUserData(id): Observable<any> {
    const url = `${this.deleteUrl}${id}`;
    return this.http.delete(url).pipe(map(response => {
      return response;
    }))
  }

  // create user
  createUser(user): Observable<any> {
    return this.http.post(this.createUserUrl, user);
  }

  // update user
  updateUserData(updateData) {    
    const url = `${this.updateUserUrl}${updateData.id}`;
    return this.http.put(url, updateData).pipe(
      map(
        data => {
          return data;
        }
      )
    );

  }


}

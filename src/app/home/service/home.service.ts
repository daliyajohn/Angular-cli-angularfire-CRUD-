import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  listUrl: string = 'http://dummy.restapiexample.com/api/v1/employees';
  deleteUrl = 'http://dummy.restapiexample.com/api/v1/delete/';
  createUserUrl = 'http://dummy.restapiexample.com/api/v1/create';
  updateUserUrl = 'http://dummy.restapiexample.com/api/v1/update/';

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }
  employeeList: AngularFireList<any>;

  // get user details
  getUsersData() {
    // return  this.db.list('/employeelist').snapshotChanges();
    this.employeeList = this.db.list('/employeelist');
    return this.employeeList;
  }

  // delete user
  deleteUserData(id): Observable<any> {
    const url = `${this.deleteUrl}${id}`;
    return this.http.delete(url).pipe(map(response => {
      return response;
    }))
  }

  // create user
  createUser(user) {
    console.log('service add data', user);
    
    // return this.http.post(this.createUserUrl, user);

    this.employeeList.push({
      name: user.name,
      scope: user.score,
      weight: user.weight,
      date: user.date
    });
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

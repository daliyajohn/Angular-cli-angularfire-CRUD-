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
    this.employeeList = this.db.list('/employeelist');
    return this.employeeList;
  }

  // create user
  createUser(user) {
    this.employeeList.push({
      name: user.name,
      score: user.score,
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

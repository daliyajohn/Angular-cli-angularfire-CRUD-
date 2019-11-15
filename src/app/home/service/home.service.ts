import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
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
    this.employeeList.update(updateData.$key,
    {
      name: updateData.name,
      score: updateData.score,
      weight: updateData.weight,
      date: updateData.date
    });
  }
}

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
  taskList: AngularFireList<any>;

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

  // get task details
  getTaskData() {
    this.taskList = this.db.list('/tasklist');
    return this.taskList;
  }

  // create task
  createTask(user) {    
    this.taskList.push({
      date: user.date,
      task1: user.task1,
      task2: user.task2,
      task3: user.task3,
      task4: user.task4,
      task5: user.task5,
      task6: user.task6
    });
  }

  // update task
  updateTaskData(updateTaskData) {
    this.taskList.update(updateTaskData.$key,
      {
        date: updateTaskData.date,
        task1: updateTaskData.task1,
        task2: updateTaskData.task2,
        task3: updateTaskData.task3,
        task4: updateTaskData.task4,
        task5: updateTaskData.task5,
        task6: updateTaskData.task6
      }
    );
  }
}

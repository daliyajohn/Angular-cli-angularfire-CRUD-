import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userData: Observable<firebase.User>;

  constructor(private http: HttpClient, private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private router: Router) {
    this.userData = angularFireAuth.authState;
  }
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

  // Sign up 
  SignUp(data) {
    this.angularFireAuth
    .auth
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(res => {
      this.router.navigateByUrl('/home');
      var div = document.createElement("div");
      div.innerHTML = 'You are Successfully Signed Up!';
      div.classList.add("sucess-messages");
      div.classList.add("error-cus");
      document.body.appendChild(div);
      setTimeout(function () {
        document.querySelector('.sucess-messages').classList.remove('sucess-messages')
      }, 3000);
    })
    .catch(error => {
      var div = document.createElement("div");
      div.innerHTML = error.message;
      div.classList.add("error-messages");
      div.classList.add("error-cus");
      document.body.appendChild(div);
      setTimeout(function () {
        document.querySelector('.error-messages').classList.remove('error-messages')
      }, 3000);
    });
  }
    
  // Sign in 
  SignIn(data) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then(res => {
      this.router.navigateByUrl('/home');
      var div = document.createElement("div");
      div.innerHTML = 'You are Successfully Signed In!';
      div.classList.add("error-cus");
      div.classList.add("sucess-messages");
      document.body.appendChild(div);
      setTimeout(function () {
        document.querySelector('.sucess-messages').classList.remove('sucess-messages')
      }, 3000);
    })
    .catch(err => {
      var div = document.createElement("div");
      div.innerHTML = err.message;
      div.classList.add("error-messages");
      div.classList.add("error-cus");
      document.body.appendChild(div);
      setTimeout(function () {
        document.querySelector('.error-messages').classList.remove('error-messages')
      }, 3000);
    });
  }
}
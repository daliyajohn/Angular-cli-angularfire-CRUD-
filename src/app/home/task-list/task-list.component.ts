import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskForm: FormGroup;
  submitted = false;
  titleForm = "Add";
  buttonForm = "Add";

  showLoader: boolean;
  taskList = [];
  taskData:any;
  showPop: boolean;
  taskDetails: any;

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { }

  ngOnInit() {
    this.listTaskData();
    this.taskForm = this.formBuilder.group({
      date: [''],
      task1: [''],
      task2: [''],
      task3: [''],
      task4: [''],
      task5: [''],
      task6: [''],
      $key: ['']
    });
  }

  // user data list
  listTaskData() {
    var x = this.homeService.getTaskData();
    x.snapshotChanges().subscribe(item => {
      this.showLoader = false;
      this.taskList = [];
      item.forEach(element => {
        this.taskData = element.payload.toJSON();
        this.taskData["$key"] = element.key;
        this.taskList.push(this.taskData);
      });
    });
  }
  
  // submit data
  onSubmit(taskData) {
    this.submitted = true;
    if (this.taskForm.valid && !taskData.$key) {    
      this.homeService.createTask(taskData);
      this.showPop = false;
    }  
    if (this.taskDetails && this.taskDetails.$key) {
      this.homeService.updateTaskData(taskData);
      this.showPop = false;
    }
  } 

  onReset() {
    this.submitted = false;
    this.taskForm.reset();
  }

  editTaskDetails(task) {
    this.taskDetails = task;
    if (this.taskDetails && this.taskDetails.$key) {
      this.titleForm = "Edit";
      this.buttonForm = "Update";
      this.taskForm.get('date').setValue(this.taskDetails.date ? this.taskDetails.date : '');
      this.taskForm.get('task1').setValue(this.taskDetails.task1 ? this.taskDetails.task1 : '');
      this.taskForm.get('task2').setValue(this.taskDetails.task2 ? this.taskDetails.task2 : '');
      this.taskForm.get('task3').setValue(this.taskDetails.task3 ? this.taskDetails.task3 : '');
      this.taskForm.get('task4').setValue(this.taskDetails.task4 ? this.taskDetails.task4 : '');
      this.taskForm.get('task5').setValue(this.taskDetails.task5 ? this.taskDetails.task5 : '');
      this.taskForm.get('task6').setValue(this.taskDetails.task6 ? this.taskDetails.task6 : '');
      this.taskForm.get('$key').setValue(this.taskDetails.$key ? this.taskDetails.$key : '');
    }
    this.showPop = true;
  }

  showPopup() {
    this.showPop = true;
  }
}

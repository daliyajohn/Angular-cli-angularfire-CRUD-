import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../service/home.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() userEditData;
  userForm: FormGroup;
  submitted = false;
  employeeName: any = [];
  titleForm = "Add";
  buttonForm = "Add";
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { 
  }

  ngOnInit() { 
    this.employeeName = [
      {'name': 'Anand'},
      {'name': 'Daliya'},
      {'name': 'Deepu'},
      {'name': 'Erild'},
      {'name': 'Jaseena'},
      {'name': 'Nithin'},
      {'name': 'Thaha'},
      {'name': 'Vishnu'},
      {'name': 'Adarsh'},
      {'name': 'Lavanya'},
      {'name': 'Sumil'},
      {'name': 'Rahul'},
      {'name': 'Arun'},
      {'name': 'Kala'},
      {'name': 'Midhun'},
      {'name': 'Samreen'},
      {'name': 'Nithya'}
    ]
    this.userForm = this.formBuilder.group({
      name: [''],
      score: [''],
      date: [''],
      weight: [''],
      $key: ['']
    });

    if (this.userEditData && this.userEditData.$key) {
      this.titleForm = "Edit";
      this.buttonForm = "Update";
      this.userForm.get('name').setValue(this.userEditData.name ? this.userEditData.name : '');
      this.userForm.get('score').setValue(this.userEditData.score ? this.userEditData.score : '');
      this.userForm.get('date').setValue(this.userEditData.date ? this.userEditData.date : '');
      this.userForm.get('weight').setValue(this.userEditData.weight ? this.userEditData.weight : '');
      this.userForm.get('$key').setValue(this.userEditData.$key ? this.userEditData.$key : '');
    }
  }

  // submit data
  onSubmit(userData) {
    this.submitted = true;
    if (this.userForm.valid && !userData.$key) {    
      this.homeService.createUser(userData);
      this.cancelForm.emit(false);
    }  
    if (this.userEditData && this.userEditData.$key) {
        this.homeService.updateUserData(userData);
        this.cancelForm.emit(false);
    }
  } 
  
  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
}

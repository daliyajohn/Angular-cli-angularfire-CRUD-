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
  
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { 
  }

  ngOnInit() { 
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      score: ['', Validators.required],
      date: ['', Validators.required],
      weight: ['']
    });

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
  }

  // submit data
  onSubmit(userData) {
    this.submitted = true;
    if (this.userForm.valid) {    
      this.homeService.createUser(userData);
      this.cancelForm.emit(false);
    }
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
}

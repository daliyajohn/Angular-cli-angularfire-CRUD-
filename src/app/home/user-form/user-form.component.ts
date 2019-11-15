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
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { 
  }

  ngOnInit() { 
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      score: ['', Validators.required],
      date: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  // submit data
  onSubmit(userData) {
    this.submitted = true;
    if (this.userForm.valid) {

      console.log('add data', userData);
    
      this.homeService.createUser(userData);
      
      }
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }
}

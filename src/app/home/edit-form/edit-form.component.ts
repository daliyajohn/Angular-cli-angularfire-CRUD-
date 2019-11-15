import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../service/home.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  @Input() userEditData;
  userEditForm: FormGroup;
  submitted = false;
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private homeService: HomeService) { 
  }

  ngOnInit() { 
    console.log('my log', this.userEditData);
    this.userEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      score: ['', Validators.required],
      date: ['', Validators.required],
      weight: [''],
      $key: ['']
    });
    if (this.userEditData && this.userEditData.$key) {
      this.userEditForm.get('name').setValue(this.userEditData.name ? this.userEditData.name : '');
      this.userEditForm.get('score').setValue(this.userEditData.score ? this.userEditData.score : '');
      this.userEditForm.get('date').setValue(this.userEditData.date ? this.userEditData.date : '');
      this.userEditForm.get('weight').setValue(this.userEditData.weight ? this.userEditData.weight : '');
      this.userEditForm.get('$key').setValue(this.userEditData.$key ? this.userEditData.$key : '');
    }
  }

  onReset() {
    this.submitted = false;
    this.userEditForm.reset();
  }

  // update user
  updateUser(updateData) {
    this.homeService.updateUserData(updateData);
    this.cancelForm.emit(true);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HomeService } from './service/home.service';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [HomeComponent, UserListComponent, UserFormComponent, TaskListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ HomeService ],
})
export class HomeModule { }


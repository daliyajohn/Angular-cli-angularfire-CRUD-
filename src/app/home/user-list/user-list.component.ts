import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../service/home.service';
import { $ } from 'protractor';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userDetails: any;
  editUser: boolean;
  showLoader: boolean;

  employeeList = [];
  empData:any;
  employeeName: any = [];

  constructor( private router: Router, private homeService: HomeService) {
     this.listUserData();
   }

  ngOnInit() {
    this.showLoader = true;
    this.homeService.getUsersData();
    // employee name
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

  // user data list
  listUserData() {
    var x = this.homeService.getUsersData();
    x.snapshotChanges().subscribe(item => {
      this.showLoader = false;
      this.employeeList = [];
      item.forEach(element => {
        this.empData = element.payload.toJSON();
        this.empData["$key"] = element.key;
        this.employeeList.push(this.empData);
      });
    });
  }

  editUserData(UserId) {

    
    this.userDetails = UserId;
    console.log('user id',this.userDetails );
    this.editUser = true;
  }

  closeModal() {
    // document.querySelector('.modal-backdrop').classList.toggle('show');
    // document.querySelector('.modal-backdrop').classList.toggle('d-none');
    this.editUser = false;
  }

  // search data 
  filterValue() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("name");
    filter = input.value.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}






















  
}

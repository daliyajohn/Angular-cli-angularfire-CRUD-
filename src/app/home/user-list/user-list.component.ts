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
    document.querySelector('.modal-backdrop').remove();
    // document.querySelector('.modal-backdrop').classList.add('d-none');
    
    // $('#userModal').modal('hide');

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


  // sortdata
  sortUserData(tableClass, n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementsByClassName(tableClass)[0];
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName("TR");
      for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
                  var cmpX=isNaN(parseInt(x.innerHTML))?x.innerHTML.toLowerCase():parseInt(x.innerHTML);
                  var cmpY=isNaN(parseInt(y.innerHTML))?y.innerHTML.toLowerCase():parseInt(y.innerHTML);
                  cmpX=(cmpX=='-')?0:cmpX;
                  cmpY=(cmpY=='-')?0:cmpY;
          if (dir == "asc") {
              if (cmpX > cmpY) {
                  shouldSwitch= true;
                  break;
              }
          } else if (dir == "desc") {
              if (cmpX < cmpY) {
                  shouldSwitch= true;
                  break;
              }
          }
      }
      if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount ++;      
      } else {
          if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
          }
      }
    }  
  }
}



















  


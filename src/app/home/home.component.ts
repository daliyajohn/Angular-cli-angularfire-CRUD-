import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  addUser: boolean;
  constructor() { }

  ngOnInit() {
  }
  addUserData() {
    this.addUser = true;
  }

  closeModal(){
    document.querySelector('.modal-backdrop').classList.toggle('show');
    document.querySelector('.modal-backdrop').classList.toggle('d-none');
    this.addUser = false;
  }

}

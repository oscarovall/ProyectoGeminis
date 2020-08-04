import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  iframe = false;
  visible = false;

  constructor(public userService: UserService) {
    this.userService.openModalChange.subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }

  ngOnInit() {
  }

  close() {
    this.userService.hideModal();
  }

}

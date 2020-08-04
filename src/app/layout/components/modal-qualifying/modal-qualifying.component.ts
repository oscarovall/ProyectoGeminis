import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-modal-qualifying',
  templateUrl: './modal-qualifying.component.html',
  styleUrls: ['./modal-qualifying.component.css']
})
export class ModalQUALIFYINGComponent implements OnInit {
  visible = false;

  constructor(public userService: UserService) {

    this.userService.openModalQualifyChange.subscribe((visible: boolean) => {
      this.visible = visible;
    });
  }

  ngOnInit() {
  }

  close() {
    this.userService.hideModalQualify();
  }
}

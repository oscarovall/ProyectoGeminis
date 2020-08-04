import { Component, OnInit, Input, HostBinding, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { IChatMessage, IChatUser } from '../../interfaces/chat';

@Component({
  selector: 'tc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class TСChatComponent implements OnInit {
  @HostBinding('class.tc-chat') true;
  @Input() activeUser: IChatUser;
  @Input() data: IChatMessage[];
  message: IChatMessage;
  messagesEl: any;
  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private elementRef: ElementRef) {
    this.messagesEl = this.elementRef.nativeElement.getElementsByClassName('dialog-messages');
  }

  ngOnInit() {
    this.initChatForm();
    this.scrollToBottom(this.messagesEl);
  }

  initChatForm() {
    this.chatForm = this.formBuilder.group({
      content: ['', Validators.required],
      date: [''],
      my: [true]
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      let currentMessage = this.messagesEl[0];
      let date: Date = new Date();

      form.value.date = `${date.getHours()} : ${date.getMinutes()}`;
      this.data.push(form.value);

      this.initChatForm();
      currentMessage.classList.add('add-message');

      setTimeout(function() {
        currentMessage.classList.remove('add-message');
      }, 200);

      this.scrollToBottom(this.messagesEl);
    }
  }

  scrollToBottom(elem: any) {
    let eleArray = <Element[]>Array.prototype.slice.call(elem);

    setTimeout(function() {
      eleArray.map( val => {
        val.scrollTop = val.scrollHeight;
      });
    }, 0);
  }

  loadFile(event){
    event.stopPropagation();
  }
}

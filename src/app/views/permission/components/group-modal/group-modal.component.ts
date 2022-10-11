import { IGroup } from '../../interfaces/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss'],
})
export class GroupModalComponent implements OnInit {
  @Input() group: IGroup | undefined;
  @Output() onSave: EventEmitter<IGroup> = new EventEmitter();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  myForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    id: new FormControl(),
  });
  constructor() {}

  ngOnInit(): void {
    if (this.group) {
      const { id, title } = this.group;
      this.myForm.patchValue({
        id: id,
        title: title,
      });
    }
  }
  toggleLiveDemo() {
    //close
    this.onClose.emit(false);
  }
  onSubmitForm() {
    if (!this.myForm.valid) {
      return;
    }
    const { id, title } = this.myForm.value;
    if (title) {
      this.onSave.emit({
        id: id,
        title: title,
        roles: [],
      });
    }
  }
}

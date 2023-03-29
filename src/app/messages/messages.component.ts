import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { addMessage, loadMessages } from './store/actions';
import {
  selectAddingStatus,
  selectLoadingStatus,
  selectMessages,
} from './store/reducer';
import { IMessage } from './models/message';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from '../shared/decorators/unsubscriber';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
@AutoUnsubscribe
export class MessagesComponent implements OnInit {
  messages!: Observable<IMessage[]>;
  isLoading!: Observable<boolean>;
  isAdding!: Observable<boolean>;
  displayedColumns = ['id', 'name', 'message', 'created'];
  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.isLoading = this.store.select(selectLoadingStatus);
    this.isAdding = this.store.select(selectAddingStatus);
    this.messages = this.store.select(selectMessages);
  }
  ngOnInit(): void {
    this.store.dispatch(loadMessages());
    this.messages.subscribe((el) => console.log(1, el));
  }

  onOpenDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(addMessage({ message: result }));
    });
  }
}

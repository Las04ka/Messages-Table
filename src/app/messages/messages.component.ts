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
import { Observable, takeUntil } from 'rxjs';
import { AutoUnsubscribeComponent } from '../shared/unsubscriber/autounsubscribe';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent
  extends AutoUnsubscribeComponent
  implements OnInit
{
  messages!: Observable<IMessage[]>;
  isLoading!: Observable<boolean>;
  isAdding!: Observable<boolean>;
  displayedColumns = ['id', 'name', 'message', 'created'];
  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    super();
    this.isLoading = this.store.select(selectLoadingStatus);
    this.isAdding = this.store.select(selectAddingStatus);
    this.messages = this.store.select(selectMessages);
  }
  ngOnInit(): void {
    this.store.dispatch(loadMessages());
  }

  onOpenDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        this.store.dispatch(addMessage({ message: result }));
      });
  }
}

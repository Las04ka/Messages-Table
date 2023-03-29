import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MessagesService } from '../messages.service';
import {
  addMessage,
  addMessageFail,
  addMessageSuccess,
  loadMessages,
  loadMessagesFail,
  loadMessagesSuccess,
} from './actions';
import { IMessage } from '../models/message';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable()
export class MessagesEffects {
  constructor(
    private snackbarService: SnackbarService,
    private actions$: Actions,
    private messagesService: MessagesService,
  ) {}

  addMessage$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(addMessage),
      switchMap((action: ReturnType<typeof addMessage>) =>
        from(this.messagesService.addMessage(action.message)).pipe(
          map((message: IMessage) => {
            this.snackbarService.openSnackBar('Added Successfully');
            return addMessageSuccess({ message });
          }),
          catchError((err) => {
            this.snackbarService.openSnackBar(`Failed to add: ${err}`);
            return of(addMessageFail({ error: err }));
          }),
        ),
      ),
    );
  });

  loadMessages$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMessages),
      switchMap(() =>
        this.messagesService.getMessages().pipe(
          map((messages: IMessage[]) => loadMessagesSuccess({ messages })),
          catchError((err) => of(loadMessagesFail({ error: err }))),
        ),
      ),
    );
  });
}

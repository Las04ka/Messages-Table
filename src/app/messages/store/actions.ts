import { createAction, props } from '@ngrx/store';
import { IMessage } from '../models/message';

export const addMessage = createAction(
  '[Message] Add Message',
  props<{ message: IMessage }>(),
);
export const addMessageSuccess = createAction(
  '[Message] Adding Message Success',
  props<{ message: IMessage }>(),
);
export const addMessageFail = createAction(
  '[Message] Adding Message Fail',
  props<{ error: string }>(),
);

export const loadMessages = createAction('[Message] Load Messages');
export const loadMessagesSuccess = createAction(
  '[Message] Loading Messages Success',
  props<{ messages: IMessage[] }>(),
);
export const loadMessagesFail = createAction(
  '[Message] Loading Messages Fail',
  props<{ error: string }>(),
);

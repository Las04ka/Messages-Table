import { createReducer, createSelector, on } from '@ngrx/store';

import { IMessage } from '../models/message';
import {
  addMessage,
  addMessageSuccess,
  loadMessages,
  loadMessagesSuccess,
} from './actions';
import { AppState } from '../../app.state';

export interface IMessagesState {
  messages: IMessage[];
  isAddingMessages: boolean;
  isLoadingMessages: boolean;
  error?: string;
}

const initialState: IMessagesState = {
  messages: [],
  isAddingMessages: false,
  isLoadingMessages: false,
};

export const messagesReducer = createReducer(
  initialState,
  on(loadMessages, (state) => ({
    ...state,
    isLoadingMessages: true,
  })),
  on(loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    isLoadingMessages: false,
  })),
  on(addMessage, (state) => ({
    ...state,
    isAddingMessages: true,
  })),
  on(addMessageSuccess, (state) => ({
    ...state,
    isAddingMessages: false,
  })),
);
const MessagesState = (store: AppState): IMessagesState => store.messages;
export const selectMessages = createSelector(
  MessagesState,
  (state) => state.messages,
);
export const selectAddingStatus = createSelector(
  MessagesState,
  (state) => state.isAddingMessages,
);
export const selectLoadingStatus = createSelector(
  MessagesState,
  (state) => state.isLoadingMessages,
);

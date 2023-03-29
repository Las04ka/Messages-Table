import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

import { IMessage } from './models/message';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  messageCollection: AngularFirestoreCollection<IMessage>;
  constructor(private db: AngularFirestore) {
    this.messageCollection = db.collection<IMessage>('messages', (ref) =>
      ref.orderBy('created', 'desc'),
    );
  }
  async addMessage(message: IMessage): Promise<IMessage> {
    const docRef: DocumentReference = await this.messageCollection.add(message);
    const doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> =
      await docRef.get();
    return { id: doc.id, ...doc.data() } as IMessage;
  }

  getMessages(): Observable<IMessage[]> {
    return this.messageCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as IMessage;
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
      ),
    );
  }
}

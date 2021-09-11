import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as constants from '../models/constants';
import {ChatMsg} from "../models/chat-msg";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private angularFirestoreService: AngularFirestore,) {
  }

  findStats() {
    // @ts-ignore
    const statRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.stat).doc(constants.collections.stat);
    return statRef;
  }

  findRecentChats() {
    // @ts-ignore
    const chatRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.chats, ref => ref.where('tutorId', '!=', ''));
    return chatRef;
  }

  findRecentPayments() {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where('fee', '!=', ''));
    return paymentRef;
  }

  sendAdminMonitoringChatMsg(time: number, chatId: string) {
    let data: ChatMsg = {
      sort: time,
      senderAvatar: '',
      senderName: '',
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `Admin Is monitoring this chat`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time,
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  findRefunds() {
    // @ts-ignore
    const refundRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.refunds);
    return refundRef;
  }

  approveRefund(refundId: string) {
    // @ts-ignore
    const refundRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.refunds).doc(refundId);
    const data = {isApproved: true}
    return refundRef.update(data);
  }

  findPayments() {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where('fee', '!=', ''));
    return paymentRef;
  }

  findTutors() {
    // @ts-ignore
    const tutorRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.students, ref => ref.where('role', '==', 'tutor'));
    return tutorRef;
  }
}

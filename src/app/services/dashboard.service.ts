import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as constants from '../models/constants';
import {ChatMsg} from "../models/chat-msg";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  allTutors: string[] = [];

  constructor(private angularFirestoreService: AngularFirestore,) {
  }

  findStats() {
    // @ts-ignore
    const statRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.stat).doc(constants.collections.stat);
    return statRef;
  }

  findRecentChats() {
    // @ts-ignore
    const chatRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.chats, ref => ref.where('chatStatus', "in", [constants.chat_status.ongoing, constants.chat_status.openForTutors]).orderBy("createdDate", "desc").limit(10));
    return chatRef;
  }

  findRecentPayments() {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.orderBy('paidTime', "desc").limit(10));
    return paymentRef;
  }

  sendAdminMonitoringChatMsg(time: number, chatId: string) {
    let data: ChatMsg = {
      attachmentExtension: "", attachmentLink: "", isQuote: false, isValidQuote: false,
      sort: time,
      senderAvatar: '',
      senderName: '',
      isTutorJoinMessage: true,
      isAttachment: false,
      message: `Admin Is monitoring this chat`,
      senderEmail: '',
      senderId: '',
      sentBy: '',
      time: time
    }
    this.angularFirestoreService.collection(constants.collections.message).doc(chatId).collection(constants.collections.chats).add(data);
  }

  findRefunds() {
    // @ts-ignore
    const refundRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.refunds, ref => ref.orderBy('time', 'desc').limit(10));
    return refundRef;
  }

  approveRefund(refundId: string, amount: number, message: string) {
    // @ts-ignore
    const refundRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.refunds).doc(refundId);
    const data = {
      isApproved: true,
      refundAmount: amount,
      message: message
    }
    return refundRef.update(data);
  }

  findPayments() {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.orderBy('paidTime', 'desc').limit(10));
    return paymentRef;
  }

  findPaymentsByTutor(tutors: string[]) {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where('tutorName', 'in', tutors).orderBy('paidTime', 'desc').limit(10));
    return paymentRef;
  }

  findTutors() {
    // @ts-ignore
    const tutorRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.students, ref => ref.where('role', '==', 'tutor'));
    return tutorRef;
  }

  findTutorPayments() {
    // @ts-ignore
    const tutorRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.tutorEarnings);
    return tutorRef;
  }

  getPaymentsByMonthForTutor(month: number) {
    // @ts-ignore
    const paymentRef: AngularFirestoreDocument<Unknown> = this.angularFirestoreService.collection(constants.collections.payments, ref => ref.where('month', '==', month).limit(10));
    return paymentRef;
  }
}

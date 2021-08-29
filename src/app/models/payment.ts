export interface Payment {
  id: string;
  payRefNo: string;
  payStatus: string;
  questionId: string;
  fee: number;
  paidBy: string;
  paidTime: Date;
  paidCurrency: string;
  tutorId: string;
  studentImage: string;
  tutorName: string;
  studentName: string;
  questionTitle: string;

}

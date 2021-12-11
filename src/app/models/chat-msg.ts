export interface ChatMsg {
  isTutorJoinMessage: boolean;
  senderName: string;
  senderAvatar: string,
  senderId: string;
  senderEmail: string;
  message: string;
  time: number;
  sentBy: string;
  isAttachment: boolean;
  sort: number;
  isValidQuote:boolean;
  isQuote:boolean;
  attachmentExtension:string;
  attachmentLink:string;
}

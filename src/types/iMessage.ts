export interface iMessage {
  _id: string;
  senderId: string;
  text: string;
  image?: string;
  date: number;
}

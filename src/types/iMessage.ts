export interface iMessage {
  id: string;
  senderId: string;
  text: string;
  img?: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
}

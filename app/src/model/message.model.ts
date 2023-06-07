class Message {
  id: number | null;
  isHuman: boolean;
  content: string = "";
  timestamp: Date;
  conversation_id: number;

  constructor(
    id: number | null = null,
    isHuman: boolean,
    content: string = "",
    timestamp: Date,
    conversation_id: number
  ) {
    this.id = id;
    this.isHuman = isHuman;
    this.setContent(content);
    this.timestamp = timestamp;
    this.conversation_id = conversation_id;
  }

  public setContent(content: string): void {
    if (this.isHuman) {
      this.content = content;
    }
  }
}

export default Message;

class Conversation {
  id: number | null;
  user_id: number;
  persona_id: number;

  constructor(id: number | null = null, user_id: number, persona_id: number) {
    this.id = id;
    this.user_id = user_id;
    this.persona_id = persona_id;
  }
}

export default Conversation;

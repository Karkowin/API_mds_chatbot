class Conversation {
  id: number | null;
  user_id: number;
  persona_id: number;

  constructor(user_id: number, persona_id: number, id: number | null = null) {
    this.id = id;
    this.user_id = user_id;
    this.persona_id = persona_id;
  }
}

export default Conversation;

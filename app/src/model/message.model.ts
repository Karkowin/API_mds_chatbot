// IMPORTS
// --------------------------------------------------------------------------
import { askGPT } from "../tool/oa.tool";

// CLASS
// --------------------------------------------------------------------------
class Message {
  id: number | null;
  isHuman: boolean;
  content: string = "";
  timestamp: Date;
  conversation_id: number;

  constructor(
    isHuman: boolean,
    content: string = "",
    timestamp: Date,
    conversation_id: number,
    id: number | null = null
  ) {
    this.id = id;
    this.isHuman = isHuman;
    this.content = content;
    this.timestamp = timestamp;
    this.conversation_id = conversation_id;
  }

  public setContent(
    messages: Array<Message>,
    conversation: any,
    persona: any,
    universe: any,
    user_id: number
  ): Promise<any> {
    let prompt = `This is a conversation between a user (human) and an AI (ai). The conversation is represented as a JSON object, you need to respond to the last one. Return only the content of the message without ANYTHING else. The AI must respond as the following fictive character :\n\n`;
    prompt += `Name: ${persona.name}\n`;
    prompt += `Universe: ${universe.name}\n`;
    prompt += `Description: ${persona.description}\n\n`;
    prompt += `And there is the conversation :\n`;
    prompt += JSON.stringify(messages);

    return new Promise((resolve, reject) => {
      askGPT(prompt, user_id).then((result: any) => {
        if (result) {
          this.content = result.data.choices[0].text;
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export default Message;

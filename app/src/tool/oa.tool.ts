// IMPORTS
// --------------------------------------------------------------------------
import { Configuration, OpenAIApi } from "openai";
import { doQuery } from "./db.tool";

// FETCH
// --------------------------------------------------------------------------
async function askGPT(prompt: string, user_id: number): Promise<any> {
  const user = await doQuery(
    "SELECT oa_token FROM user WHERE id = ?",
    [user_id],
    false
  );
  const token = user.oa_token;
  const openai = new OpenAIApi(new Configuration({ apiKey: token }));
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
}

// EXPORTS
// --------------------------------------------------------------------------
export { askGPT };

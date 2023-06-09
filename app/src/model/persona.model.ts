// IMPORTS
// --------------------------------------------------------------------------
import { askGPT } from "../tool/oa.tool";

// CLASS
// --------------------------------------------------------------------------
class Persona {
  id: number | null;
  name: string;
  universe_id: number;
  description: string = "";

  constructor(name: string, universe_id: number, id: number | null = null) {
    this.id = id;
    this.name = name;
    this.universe_id = universe_id;
    this.description = "";
  }

  public setDescription(universe: string, user_id: number): Promise<any> {
    let prompt = `Make a short description of the character ${this.name} from the universe ${universe}. Respond only with the description, no other information, with a maximum of 250 characters.`;
    return new Promise<any>(async (resolve, reject) => {
      const response = await askGPT(prompt, user_id);
      if (response) {
        console.log(response.data.choices[0].text.length);
        this.description = response.data.choices[0].text;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export default Persona;

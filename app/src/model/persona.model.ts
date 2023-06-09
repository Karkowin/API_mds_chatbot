class Persona {
  id: number | null;
  name: string;
  universe_id: number;
  description: string = "";

  constructor(name: string, universe_id: number, id: number | null = null) {
    this.id = id;
    this.name = name;
    this.universe_id = universe_id;
    this.setDescription();
  }

  public setDescription(): void {
    this.description = "description";
  }
}

export default Persona;

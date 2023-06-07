class Universe {
  id: number | null;
  name: string;

  constructor(id: number | null = null, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default Universe;

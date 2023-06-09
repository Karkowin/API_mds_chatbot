// CLASS
// --------------------------------------------------------------------------
class Universe {
  id: number | null;
  name: string;

  constructor(name: string, id: number | null = null) {
    this.id = id;
    this.name = name;
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export default Universe;

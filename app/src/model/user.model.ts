// CLASS
// --------------------------------------------------------------------------
import bcrypt from "bcrypt";

// CLASS
// --------------------------------------------------------------------------
class User {
  id: number | null;
  email: string;
  password: string = "";
  oa_token: string;

  constructor(
    email: string,
    password: string,
    oa_token: string,
    id: number | null = null
  ) {
    this.id = id;
    this.email = email;
    this.setPassword(password);
    this.oa_token = oa_token;
  }

  public setPassword(password: string): void {
    const isBcryptHash = /^\$2[ayb]\$.{56}$/i.test(password);
    if (isBcryptHash) {
      this.password = password;
    } else {
      this.password = bcrypt.hashSync(password, 10);
    }
  }

  public checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

// EXPORTS
// --------------------------------------------------------------------------
export default User;

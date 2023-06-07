import bcrypt from "bcrypt";

class User {
  email: string;
  password: string = "";
  oa_token: string;

  constructor(email: string, password: string, oa_token: string) {
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

export default User;

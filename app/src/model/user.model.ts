import bcrypt from "bcrypt";

class User {
  constructor(public email: string, public password: string) {
    this.email = email;
    this.setPassword(password);
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

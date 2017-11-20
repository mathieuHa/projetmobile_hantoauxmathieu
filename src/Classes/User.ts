export class User {
  public id: number;
  public username: string;

  public constructor (id: number, username: string) {

  }

  toString () {
    return this.username;
  }
}

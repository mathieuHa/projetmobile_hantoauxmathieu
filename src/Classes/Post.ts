import {User} from "./User";

export class Post {
  public id: number;
  public titre: string;
  public texte: string;
  public comments: Comment[];
  public user: User;

  public constructor (id: number, titre: string, texte: string) {

  }

  toString() {
    return "Working";
  }
}

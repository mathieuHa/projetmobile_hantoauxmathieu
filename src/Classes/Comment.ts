export class Comment {
  public id: number;
  public texte: string;

  public constructor (id: number, texte: string) {

  }

  toString() {
    return this.texte;
  }
}

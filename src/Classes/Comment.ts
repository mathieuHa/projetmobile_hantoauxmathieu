export class Comment {
  public id: number;
  public texte: string;
  public likes: string;

  public constructor (id: number, texte: string, likes: number) {

  }

  toString() {
    return this.texte;
  }
}

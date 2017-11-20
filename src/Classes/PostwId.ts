export class PostwId {
  private titre: string;
  private texte: string;

  public gettitre(): string {
    return this.titre;
  }

  public settitre(value: string) {
    this.titre = value;
  }

  public gettexte(): string {
    return this.texte;
  }

  public settexte(value: string) {
    this.texte = value;
  }

  public constructor (titre: string, texte: string) {
    this.titre = titre;
    this.texte = texte;
  }
}

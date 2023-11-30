import { v4 as uuidv4 } from "uuid";

export default class Uuid {
  private id: string;

  constructor(id?: string) {
    if (!!id) {
      this.id = id;
      return;
    }

    this.id = uuidv4();
  }

  getStringValue() {
    return this.id;
  }
}

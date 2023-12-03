import Uuid from "./Uuid";

export default class Entity<T> {
  protected id: Uuid;
  protected props: T;

  constructor(props: T, id?: string) {
    this.props = props;
    this.id = new Uuid(id);
  }

  getId() {
    return this.id.getStringValue()
  }
}

import { Collection } from "../models/Collection";

export abstract class CollectionView<T, U> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public collection: Collection<T, U>) {
    this.bindModel();
    this.fetchCollection();
  }

  bindModel(): void {
    this.collection.on("change", () => {
      this.render();
    });
  }

  fetchCollection(): void {
    this.collection.fetch();
  }

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");

    for (let model of this.collection.models) {
      const itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }
}

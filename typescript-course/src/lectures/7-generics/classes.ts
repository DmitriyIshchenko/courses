// GENERIC CLASSES

// we don't care what type the storage stores
// but it would work as intended only for primitive types (because of removing item method)
class DataStorage<T extends string | number | boolean> {
  private data: Array<T> = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Pete");
// textStorage.addItem(2) // Error
textStorage.addItem("Max");
textStorage.removeItem("Pete");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Steve" });
// objStorage.addItem({ name: "Maria" });

// objStorage.removeItem({ name: "Steve" });
// console.log(objStorage.getItems());

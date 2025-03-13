import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") return;
    const parsedList: {
      id: string;
      item: string;
      checked: boolean;
    }[] = JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj.id,
        itemObj.item,
        itemObj.checked
      );
      this._list.push(newListItem);
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }
  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}

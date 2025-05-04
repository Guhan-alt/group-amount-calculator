export interface Item {
  id: string;
  name: string;
  price: number;
  isDeduction: boolean;
}

export interface Person {
  id: string;
  name: string;
  items: Item[];
}

export interface GroupState {
  people: Person[];
}
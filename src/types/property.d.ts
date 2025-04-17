export enum PropertyType {
  ESTATE = "estate",
  APARTMENT = "apartment",
}

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  country: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

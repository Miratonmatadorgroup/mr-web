export enum HouseType {
  MANSION = "mansion",
  DUPLEX = "duplex",
  BUNGALOW = "bungalow",
  FLAT = "flat",
  PENTHOUSE = "penthouse",
  TERRACE = "terrace",
  SEMI_DETACHED = "semi_detached",
  DETACHED = "detached",
  TRADITIONAL = "traditional",
}

export interface House {
  id: string;
  propertyId: string;
  type: HouseType;
  address: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

import { Property } from "@/types/property";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PropertyState {
  properties: Property[];
  getProperty: (id: string) => Property | null;
  addProperty: (property: Property | null) => void;
  setProperties: (properties: Property[] | []) => void;
  removeProperty: (id: string) => void;
  clearProperties: () => void;
  updateProperty: (property: Property) => void;
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      properties: [],
      clearProperties() {
        set({ properties: [] });
      },
      getProperty: (id) => {
        return (
          get().properties.find((property: Property) => property.id === id) ||
          null
        );
      },
      setProperties: (properties) => {
        set({ properties });
      },
      removeProperty: (id) => {
        set((state) => ({
          properties: state.properties.filter((property) => property.id !== id),
        }));
      },
      updateProperty: (property) => {
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === property.id ? property : p
          ),
        }));
      },
      addProperty: (property) => {
        if (property) {
          set((state) => ({
            properties: [...state.properties, property],
          }));
        }
      },
    }),
    {
      name: "property-storage", // Key in localStorage
    }
  )
);

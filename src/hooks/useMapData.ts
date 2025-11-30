// useMapData.ts
import { useState, useEffect, useContext } from "react";
import { getCategories } from "../services/mapServices";
import { Category, ObjectItem } from "@/utils/types";
import { NavigationContext } from "@/pages/Map";
import { NavigationContextType } from "@/utils/types";
import roomsCatalog from "@/data/roomsCatalog";

function useMapData() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const context = useContext(NavigationContext) as NavigationContextType;
  const currentFloor = context?.currentFloor || "F1";

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const categoriesData = await getCategories();
      // Build objects purely from the central rooms catalog so it's the single source of truth
      const objectsFromCatalog: ObjectItem[] = roomsCatalog.map((r) => ({
        id: r.id,
        name: r.name,
        desc: r.desc || "",
        categoryId: r.categoryId,
        floor: r.floor,
      }));

      // Optional: filter by current floor in the future
      // const floorFiltered = objectsFromCatalog.filter(o => o.floor === currentFloor);

      // Set categoryName directly from catalog categoryId (using normalized categories)
      objectsFromCatalog.forEach((obj) => {
        obj.categoryName = obj.categoryId;
      });
      setObjects(objectsFromCatalog);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentFloor]);

  return { objects, categories, isLoading, refetchData: fetchData };
}

export default useMapData;

// useMapData.ts
import { useState, useEffect } from "react";
import { getObjects, getCategories } from "../services/mapServices";
import { Category, ObjectItem } from "@/utils/types";

function useMapData() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const objectsData = await getObjects();
      const categoriesData = await getCategories();
      // Add categoryName to each object
      objectsData.forEach((obj) => {
        obj.categoryName = categoriesData.find(
          (cat) => cat.id === obj.categoryId
        )?.name;
      });
      setObjects(objectsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { objects, categories, isLoading, refetchData: fetchData };
}

export default useMapData;

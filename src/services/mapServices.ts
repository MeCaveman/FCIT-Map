import db from "@/assets/db.json";
import { Beacon, Category, ObjectItem } from "@/utils/types";
import apiService from "./apiService";

export async function getObjects(): Promise<ObjectItem[]> {
  // In production without a backend, skip API and use local data directly
  if (import.meta.env.PROD) {
    console.log("Production mode: Using local db.json");
    return db.objects as ObjectItem[];
  }

  try {
    const response = await apiService.get("/objects");
    const data = response.data;
    
    console.log("API Response for objects:", data);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data as ObjectItem[];
    } else if (data && typeof data === 'object' && Array.isArray(data.objects)) {
      return data.objects as ObjectItem[];
    } else {
      console.warn("Unexpected API response format, using fallback");
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error(
      "Error fetching objects from API, falling back to local db.json:",
      error
    );
    
    // Ensure db.objects exists and is an array
    if (db && Array.isArray(db.objects)) {
      console.log("Using local db.json objects:", db.objects.length, "items");
      return db.objects as ObjectItem[];
    } else {
      console.error("db.objects is not valid:", db);
      return [];
    }
  }
}

export async function getObjectById(id: string): Promise<ObjectItem> {
  // In production without a backend, use local data directly
  if (import.meta.env.PROD) {
    const object = db.objects.find((obj) => obj.id === id);
    if (!object) {
      throw new Error(`Object with ID ${id} not found in local db.json`);
    }
    return object;
  }

  try {
    const response = await apiService.get(`/objects/${id}`);
    const data = response.data;
    
    // Handle array response
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as ObjectItem;
    } else if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data as ObjectItem;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error(`Error fetching object with ID ${id}:`, error);
    const object = db.objects.find((obj) => obj.id === id);
    if (!object) {
      throw new Error(`Object with ID ${id} not found in local db.json`);
    }
    return object;
  }
}

export async function getCategories(): Promise<Category[]> {
  // In production without a backend, skip API and use local data directly
  if (import.meta.env.PROD) {
    console.log("Production mode: Using local db.json");
    return db.categories as Category[];
  }

  try {
    const response = await apiService.get("/categories");
    const data = response.data;
    
    console.log("API Response for categories:", data);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data as Category[];
    } else if (data && typeof data === 'object' && Array.isArray(data.categories)) {
      return data.categories as Category[];
    } else {
      console.warn("Unexpected API response format, using fallback");
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error(
      "Error fetching categories from API, falling back to local db.json:",
      error
    );
    
    // Ensure db.categories exists and is an array
    if (db && Array.isArray(db.categories)) {
      console.log("Using local db.json categories:", db.categories.length, "items");
      return db.categories as Category[];
    } else {
      console.error("db.categories is not valid:", db);
      return [];
    }
  }
}

export async function createCategory(
  newCategory: Partial<Category>
): Promise<Category | null> {
  try {
    const response = await apiService.post("/categories", newCategory);
    return response.data as Category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    await apiService.delete(`/categories/${id}`);
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    throw error;
  }
}

export async function updateObject(
  id: string,
  updatedData: Partial<ObjectItem>
): Promise<ObjectItem | null> {
  try {
    const response = await apiService.put(`/objects/${id}`, updatedData);
    return response.data as ObjectItem;
  } catch (error) {
    console.error(`Error updating object with ID ${id}:`, error);
    throw error;
  }
}

export async function updateCategory(
  id: string,
  updatedData: Partial<Category>
): Promise<Category | null> {
  try {
    const response = await apiService.put(`/categories/${id}`, updatedData);
    return response.data as Category;
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    throw error;
  }
}

export async function getBeacon(): Promise<Beacon[]> {
  try {
    const response = await apiService.get("/fingerprints");
    const data = response.data;
    
    if (Array.isArray(data)) {
      return data as Beacon[];
    } else {
      throw new Error("Invalid beacon data format");
    }
  } catch (error) {
    console.error("Error fetching beacons:", error);
    throw error;
  }
}
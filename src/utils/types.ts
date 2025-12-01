

export interface ObjectItem {
  id: string;
  name: string;
  desc: string;
  categoryId: string;
  categoryName?: string;
  uniqueId?: string;
  // Optional floor identifier, e.g., "F1" or "F2"
  floor?: string;
}
export interface Category {
  id: string;
  name: string;
}

export interface Beacon {
  _id: string;
  beacon_id: string;
  rssi: number;
}

export interface Navigation {
  start: string;
  end?: string;
}

export interface NavigationContextType {
  navigation: Navigation;
  setNavigation: React.Dispatch<React.SetStateAction<Navigation>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentFloor: string;
  setCurrentFloor: React.Dispatch<React.SetStateAction<string>>;
}

export interface MapDataContextType {
  objects: ObjectItem[];
  categories: Category[];
  beacons?: Beacon[];
  refetchData: () => Promise<void>;
  isLoading: boolean;
}

export interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BleBeacon {
  name: string;
  id: string;
  rssi: number;
  txPower: number;
  uuids: string[];
}

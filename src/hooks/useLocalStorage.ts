import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Simple state hook skeleton that mimics localStorage (to be completed in execution phase)
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue];
}

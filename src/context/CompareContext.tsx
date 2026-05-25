"use client";

import React, { createContext, useContext, useState } from "react";

interface CompareContextType {
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const addToCompare = (id: string) => {
    if (compareList.length >= 3) {
      return;
    }
    if (!compareList.includes(id)) {
      setCompareList((prev) => [...prev, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}

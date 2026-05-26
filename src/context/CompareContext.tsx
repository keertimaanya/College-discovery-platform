"use client";

import React, { createContext, useContext, useState } from "react";

interface CompareContextType {
  compareIds: string[];
  addToCompare: (id: string) => string | void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const addToCompare = (id: string): string | void => {
    if (compareIds.includes(id)) {
      return;
    }
    if (compareIds.length >= 3) {
      return "Maximum 3 colleges can be compared";
    }
    setCompareIds((prev) => [...prev, id]);
  };

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((item) => item !== id));
  };

  const isInCompare = (id: string) => {
    return compareIds.includes(id);
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}

"use client";

import React, { createContext, useContext, useState } from "react";

interface SavedContextType {
  savedColleges: string[];
  toggleSaveCollege: (id: string) => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedColleges, setSavedColleges] = useState<string[]>([]);

  const toggleSaveCollege = (id: string) => {
    setSavedColleges((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <SavedContext.Provider value={{ savedColleges, toggleSaveCollege }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SavedContextType {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Read from localStorage on initial mount (client-side only to ensure SSR safety)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved-colleges");
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Write to localStorage whenever savedIds changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("saved-colleges", JSON.stringify(savedIds));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [savedIds, isLoaded]);

  const toggleSaved = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => {
    return savedIds.includes(id);
  };

  return (
    <SavedContext.Provider value={{ savedIds, toggleSaved, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (context === undefined) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  const searchParamsString = searchParams ? searchParams.toString() : "";

  // Trigger simulated progress bar when the route path changes
  useEffect(() => {
    setVisible(true);
    setWidth(25);

    const step1 = setTimeout(() => setWidth(70), 100);
    const step2 = setTimeout(() => {
      setWidth(100);
      const hide = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 150);
      return () => clearTimeout(hide);
    }, 250);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
    };
  }, [pathname, searchParamsString]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-blue-100 pointer-events-none">
      <div
        className="h-full bg-blue-600 transition-all duration-200 ease-out shadow-[0_0_8px_rgba(37,99,235,0.6)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export function NavigationProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBar />
    </Suspense>
  );
}

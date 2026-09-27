"use client";
import { createContext, useContext, useEffect, useState } from "react";
const MotionContext = createContext(true);
export function useMotionPreference() {
  return useContext(MotionContext);
}
// Production animations enter/respond, settle and stop. System preference remains authoritative.
export function MotionProvider({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <MotionContext.Provider value={!systemReduced}>
      <div className={className} data-motion={systemReduced ? "off" : "on"}>
        {children}
      </div>
    </MotionContext.Provider>
  );
}

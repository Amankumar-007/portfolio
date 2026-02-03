"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface CursorContextType {
  setCursorHover: (hovered: boolean, text?: string, size?: number, color?: string) => void;
  isHovered: boolean;
  hoverText: string;
  cursorSize: number;
  cursorColor: string;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [cursorSize, setCursorSize] = useState(40);
  const [cursorColor, setCursorColor] = useState('#000000');

  const setCursorHover = (hovered: boolean, text?: string, size?: number, color?: string) => {
    setIsHovered(hovered);
    if (text) setHoverText(text);
    if (size) setCursorSize(size);
    if (color) setCursorColor(color);
  };

  return (
    <CursorContext.Provider value={{
      setCursorHover,
      isHovered,
      hoverText,
      cursorSize,
      cursorColor
    }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

import React from "react";

export const ProfileCardArc1 = () => (
  <svg
    className="absolute -top-3 -left-3 w-52 h-52 pointer-events-none z-20"
    viewBox="0 0 200 200"
    fill="none"
  >
    <path
      d="M 10 120 C 30 30, 110 10, 190 15"
      stroke="#F05335"
      strokeWidth="2.5"
      strokeDasharray="6 6"
      strokeLinecap="round"
    />
  </svg>
);

export const ProfileCardArc2 = () => (
  <svg
    className="absolute bottom-28 -left-4 w-56 h-36 pointer-events-none z-20"
    viewBox="0 0 220 140"
    fill="none"
  >
    <path
      d="M 0 110 Q 90 105, 125 45"
      stroke="#F05335"
      strokeWidth="2.5"
      strokeDasharray="6 6"
      strokeLinecap="round"
    />
  </svg>
);

export const HeroCardPattern1 = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    viewBox="0 0 300 200"
    fill="none"
  >
    <path
      d="M-50 50 C 50 150, 150 -20, 350 100 M-20 120 C 80 200, 180 50, 350 160"
      stroke="#000"
      strokeWidth="24"
    />
  </svg>
);

export const HeroCardPattern2 = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
    viewBox="0 0 250 200"
    fill="none"
  >
    <path
      d="M10 200 L50 20 L90 200 L140 0 L180 200 L230 40"
      stroke="#86bd00"
      strokeWidth="3.5"
    />
  </svg>
);

export const NextJsIcon = () => (
  <svg className="w-6 h-6 text-black fill-black" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.4 17.1l-6.8-9.4v9.4H9V6.9h2.3l6.5 9v-9h1.6v10.2h-2z" fill="#000000" />
  </svg>
);

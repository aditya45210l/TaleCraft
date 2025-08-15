// components/LoadingPage.js

import React from "react";

export function LoadingPage() {
  return (
    <div className="absolute inset-0 flex flex-col bg-background items-center justify-center bg-opacity-75 z-20 rounded-lg">
      <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
        <circle cx="4" cy="12" r="2" fill="currentColor"/>
        <circle cx="12" cy="4" r="2" fill="currentColor"/>
        <circle cx="20" cy="12" r="2" fill="currentColor"/>
        <circle cx="12" cy="20" r="2" fill="currentColor"/>
      </svg>
    </div>
  );
}

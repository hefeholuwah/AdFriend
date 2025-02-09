"use client";

import React from "react";

export function Section({ children }: { children: React.ReactNode }) {
  return <section className="px-6 py-12">{children}</section>;
}

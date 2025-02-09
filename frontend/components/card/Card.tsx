import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx("bg-white rounded-2xl shadow-lg p-4", className)}>
      {children}
    </div>
  );
};

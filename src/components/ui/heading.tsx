"use client";
import React from "react";
interface HeadingProps {
  title: string;
  description: string;
}
const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className=" text-3xl tracking-tight font-bold">{title}</div>
        <p className=" text-sm text-muted-foreground">{description}</p>
      </div>
    </>
  );
};

export default Heading;

"use client";

import React from "react";

type Props = {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  errors?: string;
  className?:string;
  icon:React.ReactNode;
};

export default function Input({ name, type, placeholder, required, errors,icon,className }: Props) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className="absolute top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
           name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className={`border-2 rounded-xl py-1 pl-10 placeholder:text-sm w-full focus:outline-none
              ${errors
                ? "border-red-500 ring-1 ring-red-500"
                :""}${className}`}
            />
      </div>
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </div>
  );
}

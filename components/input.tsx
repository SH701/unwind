"use client";

import React from "react";

type Props = {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  errors?: string;
  icon: React.ReactNode;  // 🔥 icon prop 추가
};

export default function Input({ name, type, placeholder, required, errors, icon }: Props) {
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
          className={`border rounded-2xl py-1 pl-10 placeholder:text-sm w-70 focus:border-2
            ${errors
              ? "border-red-500 focus:ring-2 ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"}`}
        />
      </div>
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </div>
  );
}

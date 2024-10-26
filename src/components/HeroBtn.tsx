'use client'
import React from "react";
import Link from "next/link"; // Import Link from Next.js

export function HeroBtn() {
  return (
    <div className="py-4 flex items-center justify-center">
      <Link href="/weather">
        <div className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn relative rounded-md px-5 py-1">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Sign Up
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black z-20">
            Just Kiddin
          </div>
        </div>
      </Link>
    </div>
  );
}

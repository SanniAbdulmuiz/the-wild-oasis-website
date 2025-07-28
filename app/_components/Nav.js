"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Nav({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-10 text-base sm:text-xl p-4 relative">
      {/* Toggle button - visible only on small screens */}
      <div className="sm:hidden flex justify-end">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>
      <ul
        className={`
          ${isOpen ? "block" : "hidden"} 
          sm:flex sm:gap-16 gap-8 items-center
          sm:static absolute top-12 left-0 w-full bg-white sm:bg-transparent sm:w-auto sm:top-0 sm:left-0 sm:py-0 py-4 px-4
          transition-all z-20
        `}
      >
        <li>
          <Link
            href="/cabins"
            className="block hover:text-accent-400 transition-colors py-2"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="block hover:text-accent-400 transition-colors py-2"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-4 hover:text-accent-400 transition-colors py-2"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="block hover:text-accent-400 transition-colors py-2"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

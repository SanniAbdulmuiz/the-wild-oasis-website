"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Nav({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <nav className="z-10 text-base sm:text-xl p-4 relative">
      {/* Mobile Toggle Button */}
      <div className="sm:hidden flex justify-end">
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} aria-label="Open menu">
            <Bars3Icon className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex sm:gap-16 gap-8 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-4 hover:text-accent-400 transition-colors"
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
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile Sidebar & Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] sm:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <div
            className={`
              absolute top-0 right-0 h-full w-80 max-w-[250px]
              bg-gray-900 text-white z-[1000]
 shadow-2xl p-8 flex flex-col gap-6 overflow-y-auto
              transition-transform duration-300 transform
            `}
          >
            <button
              onClick={closeSidebar}
              aria-label="Close menu"
              className="self-end mb-4"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <Link
              href="/cabins"
              onClick={closeSidebar}
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
            <Link
              href="/about"
              onClick={closeSidebar}
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
            {session?.user?.image ? (
              <Link
                href="/account"
                onClick={closeSidebar}
                className="flex items-center gap-4 hover:text-accent-400 transition-colors"
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
                onClick={closeSidebar}
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

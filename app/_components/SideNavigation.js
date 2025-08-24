"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sm:hidden p-4">
        <button onClick={() => setIsOpen(true)} aria-label="Open sidebar">
          <Bars3Icon className="h-8 w-8 text-primary-100" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-primary-950 text-primary-100 
          shadow-2xl z-[1000] transition-transform duration-300 transform
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:static sm:block
        `}
      >
        <div className="sm:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} aria-label="Close sidebar">
            <XMarkIcon className="h-6 w-6 text-primary-100" />
          </button>
        </div>

        <nav className="border-r border-primary-900 h-full">
          <ul className="flex flex-col gap-2 text-lg h-full">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                    pathname === link.href ? "bg-primary-900" : ""
                  }`}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}

            <li className="px-5 pb-5 sm:mt-auto">
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideNavigation;

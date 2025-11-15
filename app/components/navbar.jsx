'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import sunIcon from "../../public/assets/svg/sun.svg";
import moonIcon from "../../public/assets/svg/moon-fill.svg";
import logo from "../../public/assets/logo/icononly_transparent_nobuffer.png";

const Navbar = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("theme");
        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        } else {
            const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initial = prefersDark ? "dark" : "light";
            setTheme(initial);
            document.documentElement.setAttribute("data-theme", initial);
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        if (typeof window !== "undefined") {
            localStorage.setItem("theme", next);
            document.documentElement.setAttribute("data-theme", next);
        }
    };

    return (
        <nav className="navbar bg-base-300 px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <a
                    href="/"
                    aria-label="Home"
                >
                    <Image src={logo} alt="Logo" width={64} height={64} className="block" />
                </a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            <div className="navbar-end">
                <div className="hidden sm:flex items-center gap-2">
                    <input type="search" placeholder="Search" className="input input-sm input-bordered" />
                    <a className="btn btn-primary btn-sm" href="/signup">Sign up</a>
                </div>

                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="btn btn-ghost btn-sm ml-2"
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                    {theme === "dark" ? (
                        // sun icon
                        <Image src={sunIcon} alt="Sun Icon" className="h-4 w-4" />
                    ) : (
                        // moon icon
                        <Image src={moonIcon} alt="Moon Icon" className="h-4 w-4" />
                    )}
                </button>

                <div className="dropdown dropdown-end ml-2">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full bg-blue-300 text-xl flex items-center justify-center">U</div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/settings">Settings</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
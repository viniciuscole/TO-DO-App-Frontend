"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do List",
  description: "Create an list and manage your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <html lang="br" className={theme === "light" ? "light" : ""}>
      <body className={inter.className}>
        <div className="changeThemeDiv" onClick={changeTheme}>
          {theme === "light" ? (
            <BiSolidSun className="icon" />
          ) : (
            <BiSolidMoon className="icon" />
          )}
        </div>
        {children}
      </body>
    </html>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="bg-slate-900 h-screen">
      <header className="container mx-auto flex w-full items-center justify-between py-4 px-6">
        <a href="#">
          <div className="w-full text-center text-lg font-extrabold sm:w-fit sm:text-left">
            <span className="text-indigo-500 landing-body">Dev</span>
            <span className="text-slate-300 landing-body">Connect</span>
          </div>
        </a>
      </header>
      <section className="container mx-auto px-8 py-36 text-center sm:px-12">
        <h1 className="landing-text mb-14 font-sans">
          Networking for Developers
          <br />
          Made Easy
        </h1>
        <p className="mb-12 text-heading4-medium leading-relaxed text-slate-500">
          Simplify Your Developer Network Experience: Connecting Developers
          Effortlessly
        </p>
        <div className="mx-auto flex w-fit flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link href={"/sign-in"}>
            <Button
              className="bg-indigo-500 hover:bg-indigo-700 rounded-lg px-10 py-8"
            >
              <p className="text-heading4-medium">Get Started</p>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

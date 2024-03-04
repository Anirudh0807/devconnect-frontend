"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

function CommunitySearchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const keyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/communities/?searchTerm=${search}`);
    }
  };

  return (
    <div className="searchbar">
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search for Communities"}
        className="no-focus searchbar_input"
        onKeyDown={keyEvent}
      />

      <Button className="bg-transperent" onClick={() => router.push(`/communities/?searchTerm=${search}`)}>
        <Image
          src="/assets/search-gray.svg"
          alt="search"
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
}

export default CommunitySearchbar;
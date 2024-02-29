"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  routeType: string;
}

function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const keyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search/?searchTerm=${search}`);
    }
  }

  return (
    <div className="searchbar">
      <Button></Button>
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search for Posts"}
        className="no-focus searchbar_input"
        onKeyDown={keyEvent}
      />
    </div>
  );
}

export default Searchbar;

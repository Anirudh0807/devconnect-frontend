"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchTerm] = useDebounce(search, 500);

  // query after 0.3s of no input
  useEffect(() => {
    router.push(`/search/?searchTerm=${searchTerm}`);
  }, [router, searchTerm]);

  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search for Posts"}
        className="no-focus searchbar_input"
      />
    </div>
  );
}

export default Searchbar;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from 'use-debounce';

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchString, setSearchString] = useState("Communities");
  const [searchTerm] = useDebounce(search, 500);

  // query after 0.3s of no input
  useEffect(() => {
    router.push(`/search/?searchString=${searchString}/?searchTerm=${searchTerm}`);
  }, [router, searchTerm, searchString]);

  return (
    <div className="flex flex-row w-full">
        <div>
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
              placeholder={`Search ${searchString}`}
              className="no-focus searchbar_input"
            />
          </div>
        </div>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={searchString} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Users">Users</SelectItem>
            <SelectItem value="Communities">Communities</SelectItem>
            <SelectItem value="Posts">Posts</SelectItem>
          </SelectContent>
        </Select>
      </div>
  );
}

export default Searchbar;
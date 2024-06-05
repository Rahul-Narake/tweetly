'use client';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { SearchIcon, X } from 'lucide-react';
import useDebounce from '@/lib/useDebounce';
import getSearchData, { SearchDataType } from '@/lib/actions/getSearchData';
import SearchData from './SearchData';
import { BackButton } from './BackButton';

function SearchComponent() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [data, setData] = useState<SearchDataType[] | null>(null);

  const getSearchResult = async () => {
    const resp = await getSearchData(searchInput);
    setData(resp);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSearchResult();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!searchInput) {
      setData(null);
    }
  }, [searchInput]);
  return (
    <div className="w-full flex">
      <BackButton />
      <div className="flex flex-col w-[80%] mx-auto">
        <div className="flex  items-center w-full rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mb-4">
          <SearchIcon color="gray" />
          <Input
            type="text"
            id="searchInput"
            name="searchInput"
            value={searchInput}
            className="border-none focus-visible:outline-none focus-visible:ring-0"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {searchInput && (
            <span
              onClick={() => {
                setSearchInput('');
              }}
              className="cursor-pointer"
            >
              <X color="blue" />
            </span>
          )}
        </div>
        <SearchData data={data} />
      </div>
    </div>
  );
}

export default SearchComponent;

'use client';
import getSearchData, { SearchDataType } from '@/lib/actions/getSearchData';
import useDebounce from '@/lib/useDebounce';
import React, { useEffect, useState } from 'react';
import { ProfileAvatar } from '../ProfileAvatar';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isSearchingAtom, selectedUserAtom } from '@/store/atoms/MessageAtom';
import { useRouter } from 'next/navigation';
import seachUsersToMsg from '@/lib/actions/searchUsersToMsg';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 500);
  const [data, setData] = useState<ConversationType[] | null>(null);
  const [isSearching, setIsSearching] = useRecoilState(isSearchingAtom);
  const setSelectedUser = useSetRecoilState(selectedUserAtom);
  const router = useRouter();

  const getSearchResult = async () => {
    setIsSearching(true);
    const resp = await seachUsersToMsg(searchInput);
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
      setIsSearching(false);
    }
  }, [searchInput]);
  return (
    <div className="w-full rounded-lg">
      <input
        type="text"
        className="w-full rounded-full bg-gray-700 h-[40px] px-1 border-1 border-gray-50 "
        placeholder="Search here"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      {data && isSearching && (
        <div className="flex flex-col space-y-2 mt-2 md:h-full h-[90px] overflow-y-auto">
          <div className="md:hidden flex flex-col space-y-2">
            {data.map((u) => {
              return (
                <div
                  className="flex items-center space-x-2 cursor-pointer bg-gray-700 rounded-2xl"
                  key={u.id}
                  onClick={() => {
                    setSearchInput('');
                    setSelectedUser(u);
                    router.push(`/messages/user/${u.id}`);
                  }}
                >
                  <ProfileAvatar name={u.name} src={u.profile} />
                  <h2>{u.name}</h2>
                </div>
              );
            })}
          </div>
          <div className="md:flex flex-col hidden space-y-2">
            {data.map((u) => {
              return (
                <div
                  className="flex items-center space-x-2 cursor-pointer bg-gray-700 rounded-2xl"
                  key={u.id}
                  onClick={() => {
                    setSearchInput('');
                    setSelectedUser(u);
                    router.push(`/messages/${u.id}`);
                  }}
                >
                  <ProfileAvatar name={u.name} src={u.profile} />
                  <h2>{u.name}</h2>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

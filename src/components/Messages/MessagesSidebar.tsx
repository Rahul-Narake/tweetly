'use client';
import React from 'react';
import SidebarComponent from './SidebarComponent';
import useGetConversations from '@/hooks/useConversations';
import SearchBar from './SearchBar';
import { useRecoilValue } from 'recoil';
import { isSearchingAtom } from '@/store/atoms/MessageAtom';

function MessagesSidebar({ path }: { path: string }) {
  const { loading, conversations } = useGetConversations();
  const isSearching = useRecoilValue(isSearchingAtom);
  return (
    <div className="flex flex-col w-full space-y-4 pt-2 overflow-y-auto scroll-smooth md:h-full h-[200px]">
      <SearchBar />
      {!loading && !isSearching && conversations ? (
        conversations.map((c) => {
          return (
            <SidebarComponent key={c.id} user={c} path={`${path}/${c.id}`} />
          );
        })
      ) : (
        <div>
          {!isSearching && !conversations && <h1>No conversations yet</h1>}
        </div>
      )}
      {loading && <div>loading...</div>}
    </div>
  );
}

export default MessagesSidebar;

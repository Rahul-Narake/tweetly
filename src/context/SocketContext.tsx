'use client';
import { currentUserAtom } from '@/store/atoms/post';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | null;
  onlineUsers: string[];
}
const SocketContext = createContext<ISocketContext | undefined>(undefined);

const socketURL = 'ws://localhost:5001';

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const currentUser = useRecoilValue(currentUserAtom);

  useEffect(() => {
    const socket = io(socketURL, {
      query: {
        userId: currentUser?.id,
      },
    });
    socketRef.current = socket;
    socket.on('getOnlineUsers', (users: string[]) => {
      setOnlineUsers(users);
    });

    if (!currentUser) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);
  return (
    <SocketContext.Provider value={{ onlineUsers, socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context == undefined || !context) {
    throw new Error(
      'useSocketContext must be used within a SocketContextProvider'
    );
  }
  return context;
};

export default SocketContextProvider;
